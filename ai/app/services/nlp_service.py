import spacy
from functools import lru_cache


@lru_cache(maxsize=1)
def get_nlp():
    print("Loading spaCy model...")
    nlp = spacy.load("en_core_web_sm")
    print("spaCy model loaded!")
    return nlp


def analyze_text(text: str):
    doc = get_nlp()(text)

    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    return entities