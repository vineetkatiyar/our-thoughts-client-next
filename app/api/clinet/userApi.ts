import { User } from "@/types/userType";
import axiosApi from "../axios";

type Role = "ADMIN" | "AUTHOR" | "READER";


export interface RegisterPaylod {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  result: {
    token: string;
    user: User;
  };
}

export const registerUser = async (data: RegisterPaylod) =>
  await axiosApi.post<AuthResponse>("/user/register", data);

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosApi.post<AuthResponse>("/user/login", data);
  console.log("API Response:", response);
  return response;
};


