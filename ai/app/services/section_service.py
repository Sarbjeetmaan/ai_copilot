import re

SECTION_HEADERS = [
    "SUMMARY",
    "EDUCATION",
    "EXPERIENCE",
    "PROJECTS",
    "SKILLS",
    "CERTIFICATIONS",
    "ACHIEVEMENTS"
]


def extract_sections(text: str):
    sections = {}

    current_section = "HEADER"
    sections[current_section] = []

    for line in text.splitlines():
        line = line.strip()

        if not line:
            continue

        upper_line = line.upper()

        if upper_line in SECTION_HEADERS:
            current_section = upper_line
            sections[current_section] = []
        else:
            sections[current_section].append(line)

    return {
        key.lower(): "\n".join(value)
        for key, value in sections.items()
    }