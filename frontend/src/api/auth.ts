import api from "@/services/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/login", data);
  return response.data;
};