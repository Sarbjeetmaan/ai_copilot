from pydantic import BaseModel


class ResumeRequest(BaseModel):
    resume_text: str


class ResumeJobRequest(BaseModel):
    resume_text: str
    job_description: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str