from services.embedding_service import semantic_skill_match
from data.skills import SKILLS

resume_text = """
I built RESTful APIs using FastAPI.
Developed backend services.
Created modern frontend applications using React.
Worked with Docker and Git.
"""

matches = semantic_skill_match(resume_text, SKILLS)

for match in matches:
    print(match)