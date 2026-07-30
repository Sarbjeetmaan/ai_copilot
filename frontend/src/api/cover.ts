import axios from "axios";

export async function generateCoverLetter(
  file: File,
  jobDescription: string
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await axios.post(
    "http://127.0.0.1:8000/cover-letter",
    formData
  );

  return response.data;
}