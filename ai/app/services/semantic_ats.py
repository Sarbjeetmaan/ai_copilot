from app.services.embedding_service import similarity


def calculate_semantic_score(sections: dict, job_description: str):
    """
    Calculate semantic similarity between the important
    parts of a resume and a job description.
    """

    resume_text = ""

    if sections.get("summary"):
        resume_text += sections["summary"] + "\n\n"

    if sections.get("projects"):
        resume_text += sections["projects"] + "\n\n"

    score = similarity(resume_text, job_description)

    return {
        "semantic_score": round(score * 100, 2)
    }