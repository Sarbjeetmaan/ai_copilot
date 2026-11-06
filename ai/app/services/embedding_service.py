from functools import lru_cache
from sklearn.metrics.pairwise import cosine_similarity


@lru_cache(maxsize=1)
def get_model():
    from sentence_transformers import SentenceTransformer

    print("Loading embedding model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    print("Embedding model loaded!")
    return model


def get_embedding(text: str):
    return get_model().encode(text)


def similarity(text1: str, text2: str):
    model = get_model()
    embeddings = model.encode([text1, text2])

    score = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(float(score), 3)


def semantic_skill_match(text, skills, threshold=0.75):
    if not skills:
        return []

    model = get_model()
    text_embedding = model.encode([text])
    skill_embeddings = model.encode(skills)

    scores = cosine_similarity(
        text_embedding,
        skill_embeddings
    )[0]

    found = []

    for skill, score in zip(skills, scores):
        if score >= threshold:
            found.append({
                "skill": skill,
                "score": round(float(score), 3)
            })

    return found