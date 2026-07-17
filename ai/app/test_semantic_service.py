from services.semantic_ats import calculate_semantic_score

sections = {
    "summary": """
Computer Science undergraduate skilled in Python,
FastAPI, Docker and Backend Development.
""",

    "projects": """
Built REST APIs using FastAPI.
Developed backend services using Docker.
"""
}

job = """
Looking for Backend Engineer.

Required:
Python
FastAPI
Docker

Experience building REST APIs.
"""

result = calculate_semantic_score(sections, job)

print(result)