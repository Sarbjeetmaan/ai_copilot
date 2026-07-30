def suggest_resume_improvements(sections: dict):
    suggestions = []

    summary = sections.get("summary", "")
    projects = sections.get("projects", "")
    education = sections.get("education", "")

    if len(summary) < 120:
        suggestions.append(
            "Expand your summary by mentioning your strongest skills, career goals, and key achievements."
        )

    if len(projects) < 500:
        suggestions.append(
            "Add more details to your projects. Mention technologies used, your role, and measurable outcomes."
        )

    if "github" not in projects.lower():
        suggestions.append(
            "Include GitHub repository links for your projects."
        )

    if "docker" not in projects.lower():
        suggestions.append(
            "Mention deployment or Docker usage if applicable."
        )

    if "rest" not in projects.lower():
        suggestions.append(
            "Highlight REST API development if you have experience."
        )

    if len(education) < 80:
        suggestions.append(
            "Provide complete education details including CGPA or percentage."
        )

    if not suggestions:
        suggestions.append(
            "Your resume sections look well written."
        )

    return suggestions