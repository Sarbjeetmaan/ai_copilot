from app.services.llm_service import ask_gemini
import json

def generate_feedback(resume_text: str, job_description: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Job Description:
{job_description}

Resume:
{resume_text}

Return ONLY valid JSON.

Format:

{{
    "strengths":[
        "...",
        "..."
    ],
    "weaknesses":[
        "...",
        "..."
    ],
    "missing_skills":[
        "...",
        "..."
    ],
    "resume_improvements":[
        "...",
        "..."
    ],
    "ats_tips":[
        "...",
        "..."
    ]
}}

Do not write markdown.

Do not explain.

Return JSON only.
"""

    response = ask_gemini(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "resume_improvements": [],
            "ats_tips": []
        }