import json
import re
from app.services.llm_service import ask_gemini


def generate_cover_letter(resume_text, job_description):

    prompt = f"""
You are an expert career coach and professional recruiter.

Using the resume and job description below, write a professional cover letter.

Resume:
{resume_text}

Job Description:
{job_description}

Rules:

- Keep it under 400 words.
- Professional tone.
- Mention candidate's relevant skills.
- Mention projects if relevant.
- Tailor it to the job description.
- End professionally.

Return ONLY valid JSON.

{{
    "cover_letter":"..."
}}

Do NOT use markdown.
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

        return {
            "cover_letter": ""
        }