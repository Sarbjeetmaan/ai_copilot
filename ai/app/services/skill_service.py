import re
from app.data.skills import SKILLS


def extract_skills(text: str):

    found_skills = []

    for skill in SKILLS:

        # Skills containing special characters
        if any(ch in skill for ch in ["+", ".", "-", "#"]):
            pattern = rf"(?<!\w){re.escape(skill)}(?!\w)"
        else:
            pattern = rf"\b{re.escape(skill)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            found_skills.append(skill)

    return sorted(set(found_skills))