
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def get_embeddings(texts):
    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2)
    )
    return vectorizer.fit_transform(texts).toarray()


def get_embedding(text: str):
    return get_embeddings([text])[0]


def similarity(text1: str, text2: str):
    if not text1.strip() or not text2.strip():
        return 0.0

    embeddings = get_embeddings([text1, text2])

    score = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(float(score), 3)


def semantic_skill_match(text, skills, threshold=0.75):
    if not skills or not text.strip():
        return []

    documents = [text] + list(skills)
    embeddings = get_embeddings(documents)

    scores = cosine_similarity(
        [embeddings[0]],
        embeddings[1:]
    )[0]

    return [
        {"skill": skill, "score": round(float(score), 3)}
        for skill, score in zip(skills, scores)
        if score >= threshold
    ]
