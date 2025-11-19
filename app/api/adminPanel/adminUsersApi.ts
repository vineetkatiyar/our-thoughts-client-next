import { GetAllUsersQueryParams, GetAllUsersResponse, UpdateUserPayload, User, UserRole, UserStatus } from "@/types/userType";
import axiosApi from "../axios";

export const getAllUsers = async (params?:GetAllUsersQueryParams) : Promise<GetAllUsersResponse> => {
const response = await axiosApi.get("/userManagement/all/users", { params });
return response.data;
}

export const getUserById = async (userId: string) : Promise<{ message: string; user: User; success: boolean }> => {
const response = await axiosApi.get(`/userManagement/user/details/${userId}`);
return response.data;
}

export const updateUserStatus = async (userId: string, status: UserStatus) : Promise<{ message: string; success: boolean }> => {
    const response = await axiosApi.patch(`/userManagement/update/users/${userId}/status`, { status });
    return response.data;
}

export const updateUserRole = async (userId: string, role: UserRole) : Promise<{ message: string; success: boolean }> => {
    const response = await axiosApi.patch(`/userManagement/update/users/${userId}/role`, { role });
    return response.data;
}

export const deleteUser = async (userId: string) : Promise<{ message: string; success: boolean }> => {
    const response = await axiosApi.delete(`/userManagement/delete/users/${userId}`);
    return response.data;
}

export const updateUser = async (userId: string, userData : UpdateUserPayload) : Promise<{ message: string; success: boolean; user: User }> => {
    const response = await axiosApi.patch(`/userManagement/update/users/${userId}`, userData);
    return response.data;
}

export const getCurrentUser = async () : Promise<{ user: User }> =>{
    const response = await axiosApi.get<{ user: User }>("/user/me");
    return response.data;
  }