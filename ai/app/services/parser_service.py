import re


def extract_email(text: str):
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    match = re.search(pattern, text)

    if match:
        return match.group()

    return None


def extract_phone(text: str):
    pattern = r"\b\d{10}\b"

    match = re.search(pattern, text)

    if match:
        return match.group()

    return None


def extract_name(text: str):
    lines = text.split("\n")

    for line in lines:
        line = line.strip()

        if line:
            return line

    return None