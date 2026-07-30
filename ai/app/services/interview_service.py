import json
import re
from app.services.llm_service import ask_gemini


def generate_interview_questions(resume_text, job_description):

    if job_description.strip():
        jd_text = job_description
    else:
        jd_text = """
No job description was provided.

Generate interview questions based only on the candidate's resume.
"""

    prompt = f"""
You are a Senior Technical Interviewer.

Analyze the following resume and job description.

Resume:
{resume_text}

Job Description:
{jd_text}

Generate interview questions that are specific to the candidate.

Return ONLY valid JSON in the following format:

{{
  "technical_questions": [
    "...",
    "...",
    "..."
  ],
  "hr_questions": [
    "...",
    "...",
    "..."
  ],
  "project_questions": [
    "...",
    "...",
    "..."
  ],
  "coding_questions": [
    "...",
    "...",
    "..."
  ]
}}

Rules:
- Return only valid JSON.
- No markdown.
- No explanation.
- No ```json.
- Exactly 3 questions per category.
"""

    response = ask_gemini(prompt)

    try:
        response = re.sub(r"```json", "", response)
        response = re.sub(r"```", "", response)
        response = response.strip()

        return json.loads(response)

    except Exception as e:
        print("========== GEMINI RESPONSE ==========")
        print(response)
        print("=====================================")
        print("JSON Parse Error:", e)

        return {
            "technical_questions": [],
            "hr_questions": [],
            "project_questions": [],
            "coding_questions": []
        }