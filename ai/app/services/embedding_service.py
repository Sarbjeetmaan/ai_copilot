from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

print("Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("Embedding model loaded!")


def get_embedding(text: str):
    return model.encode(text)


def similarity(text1: str, text2: str):
    emb1 = model.encode([text1])
    emb2 = model.encode([text2])

    score = cosine_similarity(emb1, emb2)[0][0]

    return round(float(score), 3)


def semantic_skill_match(text, skills, threshold=0.75):

    found = []

    text_embedding = model.encode([text])

    for skill in skills:

        skill_embedding = model.encode([skill])

        score = cosine_similarity(text_embedding, skill_embedding)[0][0]

        if score >= threshold:
            found.append({
                "skill": skill,
                "score": round(float(score), 3)
            })

    return found