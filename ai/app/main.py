from fastapi import FastAPI, UploadFile, File, Form
import shutil
import os
import time
from fastapi.middleware.cors import CORSMiddleware 
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
from app.services.resume_improvement_service import suggest_resume_improvements
from app.models import ResumeRequest, ResumeJobRequest

from app.services.interview_service import generate_interview_questions
from app.services.cover_letter_service import generate_cover_letter
from app.services.job_recommendation_service import recommend_jobs


app = FastAPI(
    title="AI Career Copilot API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Copilot 🚀"
    }


@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    start = time.time()

    # Save uploaded PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    text, page_count = extract_text_from_pdf(file_path)
    print("PDF:", round(time.time() - start, 2), "sec")

    # Basic Information
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)

    # Skills
    skills = extract_skills(text)
    print("Skills:", round(time.time() - start, 2), "sec")

    # Resume Sections
    sections = extract_sections(text)
    print("Sections:", round(time.time() - start, 2), "sec")

    # Named Entity Recognition
    entities = analyze_text(text)
    print("NER:", round(time.time() - start, 2), "sec")

    # ATS Keyword Score
    keyword_ats = calculate_ats_score(
        text,
        job_description
    )
    print("Keyword ATS:", round(time.time() - start, 2), "sec")

    # Semantic ATS Score
    semantic_ats = calculate_semantic_score(
        sections,
        job_description
    )
    print("Semantic ATS:", round(time.time() - start, 2), "sec")

    # AI Resume Feedback
    feedback = generate_feedback(
        text,
        job_description
    )
    print("Feedback:", round(time.time() - start, 2), "sec")

    # AI Resume Improvements
    improvements = suggest_resume_improvements(
        sections
    )
    print("Improvements:", round(time.time() - start, 2), "sec")

    print("TOTAL:", round(time.time() - start, 2), "sec")

    return {
        "filename": file.filename,
        "pages": page_count,
        "text": text,
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "sections": sections,
        "entities": entities,
        "keyword_ats": keyword_ats,
        "semantic_ats": semantic_ats,
        "resume_feedback": feedback,
        "resume_improvements": improvements
    }
@app.post("/interview")
async def interview(
    file: UploadFile = File(...),
    job_description: str = Form("")   # optional
):
    start = time.time()

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract resume text
    resume_text, _ = extract_text_from_pdf(file_path)

    # Generate interview questions
    questions = generate_interview_questions(
        resume_text,
        job_description
    )

    print(
        "Interview Questions:",
        round(time.time() - start, 2),
        "sec"
    )

    return {
        "interview_questions": questions
    }
@app.post("/cover-letter")
async def cover_letter(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text, _ = extract_text_from_pdf(file_path)

    letter = generate_cover_letter(
        resume_text,
        job_description
    )

    return letter
@app.post("/job-match")
async def job_match(
    file: UploadFile = File(...),
    location: str = Form(""),
    experience: str = Form(""),
    employment_type: str = Form("")
):

    start = time.time()

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text, _ = extract_text_from_pdf(file_path)

    jobs = recommend_jobs(
        resume_text,
        location,
        experience,
        employment_type,
    )

    print(
        "Job Match:",
        round(time.time() - start, 2),
        "sec",
    )

    return jobs