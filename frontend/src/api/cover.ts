import api from "@/services/api";

/*
 * Uses the shared `api` client (not plain axios) so the login token is
 * attached automatically. Without it, the server can't tell who is
 * logged in and the cover letter would never be saved to their history.
 */
export async function generateCoverLetter(
  file: File,
  jobDescription: string
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await api.post(
    "/cover-letter",
    formData
  );

  return response.data;
}