
import os
import requests
from sklearn.metrics.pairwise import cosine_similarity

MODEL_ID = "BAAI/bge-small-en-v1.5"
API_URL = f"https://router.huggingface.co/hf-inference/models/{MODEL_ID}"


def get_embeddings(texts):
    token = os.getenv("HF_TOKEN")

    if not token:
        raise RuntimeError("HF_TOKEN is not configured")

    response = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {token}"},
        json={"inputs": texts},
        timeout=60,
    )

    response.raise_for_status()
    embeddings = response.json()

    # Convert token-level vectors into one vector per text, if returned.
    if embeddings and isinstance(embeddings[0][0], list):
        embeddings = [
            [
                sum(vector[i] for vector in item) / len(item)
                for i in range(len(item[0]))
            ]
            for item in embeddings
        ]

    return embeddings


def get_embedding(text: str):
    return get_embeddings([text])[0]


def similarity(text1: str, text2: str):
    embeddings = get_embeddings([text1, text2])

    score = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(float(score), 3)


def semantic_skill_match(text, skills, threshold=0.75):
    if not skills:
        return []

    embeddings = get_embeddings([text] + list(skills))
    scores = cosine_similarity(
        [embeddings[0]],
        embeddings[1:]
    )[0]

    return [
        {"skill": skill, "score": round(float(score), 3)}
        for skill, score in zip(skills, scores)
        if score >= threshold
    ]
