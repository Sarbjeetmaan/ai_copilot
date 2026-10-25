from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from app.database import users_collection
from app.models import RegisterRequest, LoginRequest
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import (
    create_access_token,
    SECRET_KEY,
    ALGORITHM,
)

router = APIRouter()

# Optional authentication.
# Guests can still use the AI features.
security = HTTPBearer(auto_error=False)


@router.post("/register")
async def register(request: RegisterRequest):

    existing_user = await users_collection.find_one(
        {"email": request.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    user = {
        "name": request.name,
        "email": request.email,
        "password": hash_password(request.password),
        "resume_history": [],
        "interview_history": [],
        "cover_letter_history": [],
        "job_history": [],
    }

    await users_collection.insert_one(user)

    return {
        "message": "User registered successfully.",
    }


@router.post("/login")
async def login(request: LoginRequest):

    user = await users_collection.find_one(
        {"email": request.email}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not verify_password(
        request.password,
        user["password"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "user_id": str(user["_id"]),
            "email": user["email"],
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": user["name"],
        "email": user["email"],
    }


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        security
    ),
):
    """
    Returns the authenticated user information when
    a valid JWT is provided.

    Returns None when the request is from a guest.
    """

    # Guest user
    if credentials is None:
        return None

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("user_id")
        email = payload.get("email")

        if not user_id or not email:
            return None

        return {
            "user_id": user_id,
            "email": email,
        }

    except JWTError:
        # Invalid or expired token = treat as guest
        return None