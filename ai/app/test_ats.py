from services.ats_service import calculate_ats_score


resume = """
Python
FastAPI
Docker
Git
React
MongoDB
Node.js
"""

job = """
We are looking for a Backend Python Developer.

Required Skills:
Python
FastAPI
Docker
Git
AWS
Kubernetes
PostgreSQL
Redis
CI/CD
"""
result = calculate_ats_score(resume, job)

print(result)