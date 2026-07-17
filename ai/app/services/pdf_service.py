import fitz


def extract_text_from_pdf(file_path: str) -> tuple[str, int]:
    """
    Extract text from a PDF file.

    Returns:
        text (str)
        page_count (int)
    """

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    page_count = len(document)
    document.close()

    return text, page_count