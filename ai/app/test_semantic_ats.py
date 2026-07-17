from services.embedding_service import similarity

resume = """
Python
FastAPI
Docker
Git
React
MongoDB
Node.js

Built secure REST APIs using FastAPI.
"""

job = """
Looking for a Backend Engineer.

Requirements:

Python
FastAPI
Docker
Git

Develop RESTful APIs.

Experience with backend systems.
"""

score = similarity(resume, job)

print("Semantic Similarity:", score)