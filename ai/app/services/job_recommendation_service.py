import json
import re

from app.services.llm_service import ask_gemini


def recommend_jobs(
    resume_text,
    location="",
    experience="",
    employment_type=""
):

    prompt = f"""
You are an AI Career Advisor.

Analyze the following resume and recommend the best matching jobs.

Resume:
{resume_text}

Preferred Location:
{location}

Experience Level:
{experience}

Employment Type:
{employment_type}

Return ONLY valid JSON.

Format:

{{
  "recommended_jobs":[
    {{
      "title":"Backend Python Developer",
      "company_type":"Startup",
      "match":"96%",
      "location":"Remote",
      "employment":"Full Time",
      "salary":"$70k-$90k",
      "reason":"Excellent FastAPI and backend API experience.",
      "skills":[
        "FastAPI",
        "Docker",
        "REST APIs"
      ]
    }}
  ]
}}

Rules:
- Return exactly 5 jobs.
- Return ONLY JSON.
- No markdown.
- No explanations.
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
        print(e)

        return {
            "recommended_jobs": []
        }