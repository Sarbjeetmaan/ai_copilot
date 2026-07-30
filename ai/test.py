from google import genai
from dotenv import load_dotenv
import os
import time

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

start = time.time()

response = client.models.generate_content(
    model="gemini-flash-latest",
    contents="Say hello in one sentence."
)

print(response.text)
print("Time:", time.time() - start)