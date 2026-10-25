from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
)

import shutil
import os
import time

from bson import ObjectId

from fastapi.middleware.cors import CORSMiddleware

from app.services.pdf_service import extract_text_from_pdf

from app.services.parser_service import (
    extract_email,
    extract_phone,
    extract_name,
)

from app.services.skill_service import extract_skills
from app.services.section_service import extract_sections
from app.services.nlp_service import analyze_text
from app.services.ats_service import calculate_ats_score
from app.services.semantic_ats import calculate_semantic_score
from app.services.resume_feedback_service import generate_feedback
from app.services.resume_improvement_service import (
    suggest_resume_improvements,
)

from app.models import ResumeRequest, ResumeJobRequest

from app.services.interview_service import generate_interview_questions
from app.services.cover_letter_service import generate_cover_letter
from app.services.job_recommendation_service import recommend_jobs

from app.database import client, users_collection

from app.auth.auth import router as auth_router
from app.auth.dependencies import get_current_user


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="AI Career Copilot API",
    version="1.0.0",
)


# ============================================================
# AUTH ROUTES
# ============================================================

app.include_router(auth_router)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# UPLOAD FOLDER
# ============================================================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)


# ============================================================
# DATABASE STARTUP CHECK
# ============================================================

@app.on_event("startup")
async def startup_db():

    try:
        await client.admin.command("ping")

        print(
            "✅ MongoDB Connected Successfully!"
        )

    except Exception as e:

        print(
            "❌ MongoDB Connection Failed"
        )

        print(e)


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Welcome to AI Career Copilot 🚀"
    }


# ============================================================
# RESUME UPLOAD + ANALYSIS
# ============================================================

@app.post("/upload")
async def upload_resume(

    file: UploadFile = File(...),

    job_description: str = Form(...),

    current_user: dict | None = Depends(
        get_current_user
    ),
):

    start = time.time()


    # ========================================================
    # SAVE UPLOADED PDF
    # ========================================================

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )

    with open(
        file_path,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )


    # ========================================================
    # EXTRACT TEXT
    # ========================================================

    text, page_count = extract_text_from_pdf(
        file_path
    )

    print(
        "PDF:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # BASIC INFORMATION
    # ========================================================

    name = extract_name(text)

    email = extract_email(text)

    phone = extract_phone(text)


    # ========================================================
    # SKILLS
    # ========================================================

    skills = extract_skills(text)

    print(
        "Skills:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # RESUME SECTIONS
    # ========================================================

    sections = extract_sections(text)

    print(
        "Sections:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # NAMED ENTITY RECOGNITION
    # ========================================================

    entities = analyze_text(text)

    print(
        "NER:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # ATS KEYWORD SCORE
    # ========================================================

    keyword_ats = calculate_ats_score(
        text,
        job_description,
    )

    print(
        "Keyword ATS:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # SEMANTIC ATS SCORE
    # ========================================================

    semantic_ats = calculate_semantic_score(
        sections,
        job_description,
    )

    print(
        "Semantic ATS:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # AI RESUME FEEDBACK
    # ========================================================

    feedback = generate_feedback(
        text,
        job_description,
    )

    print(
        "Feedback:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # AI RESUME IMPROVEMENTS
    # ========================================================

    improvements = suggest_resume_improvements(
        sections
    )

    print(
        "Improvements:",
        round(time.time() - start, 2),
        "sec",
    )


    print(
        "TOTAL:",
        round(time.time() - start, 2),
        "sec",
    )


    # ========================================================
    # FINAL RESULT
    # ========================================================

    result = {

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

        "resume_improvements": improvements,
    }


    # ========================================================
    # SAVE HISTORY ONLY FOR LOGGED-IN USERS
    # ========================================================

    if current_user:

        history_item = {

            "filename": file.filename,

            "uploaded_at": time.time(),

            "job_description": job_description,

            "result": result,
        }


        await users_collection.update_one(

            {
                "_id": ObjectId(
                    current_user["user_id"]
                )
            },

            {
                "$push": {
                    "resume_history": history_item
                }
            },
        )


        print(
            "✅ Resume history saved for:",
            current_user["email"],
        )


    else:

        print(
            "ℹ️ Guest user - resume history not saved."
        )


    # ========================================================
    # RETURN RESULT
    # ========================================================

    return result


# ============================================================
# GET RESUME HISTORY
# ============================================================

@app.get("/resume/history")
async def get_resume_history(

    current_user: dict | None = Depends(
        get_current_user
    ),
):

    # --------------------------------------------------------
    # LOGIN REQUIRED
    # --------------------------------------------------------

    if current_user is None:

        raise HTTPException(
            status_code=401,
            detail="Login required to view history.",
        )


    # --------------------------------------------------------
    # FIND USER
    # --------------------------------------------------------

    user = await users_collection.find_one(

        {
            "_id": ObjectId(
                current_user["user_id"]
            )
        },

        {
            "resume_history": 1
        },
    )


    # --------------------------------------------------------
    # USER NOT FOUND
    # --------------------------------------------------------

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )


    # --------------------------------------------------------
    # RETURN HISTORY
    # --------------------------------------------------------

    return {

        "history": user.get(
            "resume_history",
            [],
        )

    }


# ============================================================
# INTERVIEW
# ============================================================

@app.post("/interview")
async def interview(

    file: UploadFile = File(...),

    job_description: str = Form(""),
):

    start = time.time()


    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )


    with open(
        file_path,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )


    # Extract resume text

    resume_text, _ = extract_text_from_pdf(
        file_path
    )


    # Generate interview questions

    questions = generate_interview_questions(

        resume_text,

        job_description,
    )


    print(
        "Interview Questions:",
        round(time.time() - start, 2),
        "sec",
    )


    return {

        "interview_questions": questions

    }


# ============================================================
# COVER LETTER
# ============================================================

@app.post("/cover-letter")
async def cover_letter(

    file: UploadFile = File(...),

    job_description: str = Form(...),
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )


    with open(
        file_path,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )


    resume_text, _ = extract_text_from_pdf(
        file_path
    )


    letter = generate_cover_letter(

        resume_text,

        job_description,
    )


    return letter


# ============================================================
# JOB MATCH
# ============================================================

@app.post("/job-match")
async def job_match(

    file: UploadFile = File(...),

    location: str = Form(""),

    experience: str = Form(""),

    employment_type: str = Form(""),
):

    start = time.time()


    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )


    with open(
        file_path,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )


    resume_text, _ = extract_text_from_pdf(
        file_path
    )


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