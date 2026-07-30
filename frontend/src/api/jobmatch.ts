import api from "@/services/api";

export async function generateJobMatches(
  resume: File,
  location: string,
  experience: string,
  employmentType: string
) {
  const formData = new FormData();

  formData.append("file", resume);
  formData.append("location", location);
  formData.append("experience", experience);
  formData.append("employment_type", employmentType);

  const response = await api.post(
    "/job-match",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}