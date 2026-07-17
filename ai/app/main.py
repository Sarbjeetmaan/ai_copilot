from fastapi import FastAPI, UploadFile, File
import shutil
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.parser_service import (
    extract_email,
    extract_phone,
    extract_name
)
from app.services.skill_service import extract_skills
from app.services.section_service import extract_sections
from app.services.nlp_service import analyze_text
from app.services.ats_service import calculate_ats_score
from app.services.semantic_ats import calculate_semantic_score
from app.services.resume_feedback_service import generate_feedback

app = FastAPI(
    title="AI Career Copilot API",
    version="1.0.0"
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Copilot 🚀"
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Save uploaded PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    text, page_count = extract_text_from_pdf(file_path)

    # Parse Resume Information
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)

    # Extract Skills
    skills = extract_skills(text)

    # Extract Resume Sections
    sections = extract_sections(text)

    # Named Entity Recognition
    entities = analyze_text(text)

    # -------------------------------------------------
    # Temporary Job Description (for testing ATS)
    # -------------------------------------------------

    job_description = """
    Backend Python Developer

    Required Skills:
    Python
    FastAPI
    Docker
    Git
    REST API
    PostgreSQL
    """

    # Keyword-based ATS
    keyword_ats = calculate_ats_score(
        text,
        job_description
    )

    # Semantic ATS
    semantic_ats = calculate_semantic_score(
        sections,
        job_description
    )
    feedback = generate_feedback(
        text,
        job_description
        )
    # -------------------------------------------------
    # API Response
    # -------------------------------------------------

    return {
        "filename": file.filename,
        "pages": page_count,
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "sections": sections,
        "entities": entities,
        "keyword_ats": keyword_ats,
        "semantic_ats": semantic_ats,
        "resume_feedback": feedback
    }