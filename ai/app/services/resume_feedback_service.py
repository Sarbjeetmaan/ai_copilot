from app.services.skill_service import extract_skills


def generate_feedback(resume_text: str, job_description: str):
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    missing = [
        skill
        for skill in jd_skills
        if skill not in resume_skills
    ]

    feedback = []

    if missing:
        feedback.append(
            f"Consider adding these skills if you have experience: {', '.join(missing)}."
        )

    if len(resume_text) < 2000:
        feedback.append(
            "Your resume looks short. Add more project details and measurable achievements."
        )

    if "project" not in resume_text.lower():
        feedback.append(
            "Include a Projects section."
        )

    if "github" not in resume_text.lower():
        feedback.append(
            "Add your GitHub profile."
        )

    if "linkedin" not in resume_text.lower():
        feedback.append(
            "Add your LinkedIn profile."
        )

    if not feedback:
        feedback.append(
            "Excellent! Your resume matches the job description well."
        )

    return {
        "missing_skills": missing,
        "feedback": feedback
    }