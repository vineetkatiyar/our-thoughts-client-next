import { StoriesAdminQueryParams, StoriesQueryParams, StoriesResponse } from "@/types/stroyType";
import axiosApi from "../axios";

export const getAdminStories = async (params?: StoriesQueryParams): Promise<StoriesResponse> => {
  const response = await axiosApi.get("/story/admin/get/all-story", { params });
  return response.data;
};

export const getAuthorStories = async (params?: StoriesAdminQueryParams): Promise<StoriesResponse> => {
  try {
    const response = await axiosApi.get("/story/author/get/my-stories", { params });
    const authorData = response.data;
    
    const transformedResponse: StoriesResponse = {
      message: authorData.message,
      data: authorData.stories || [],
      pagination: authorData.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: authorData.stories?.length || 0,
        itemsPerPage: params?.limit || 10,
        hasNext: false,
        hasPrev: false
      },
      filters: authorData.filters || {
        search: params?.search || "",
        sortBy: params?.sortBy || "createdAt",
        sortOrder: params?.sortOrder || "desc"
      },
      success: authorData.success
    };

    return transformedResponse;
  } catch (error) {
    console.error("Author API Error:", error);
    throw error;
  }
};

export const updateStoryVisibility = async (storyId: string) : Promise<any> => {
  const response = await axiosApi.patch<any>(`/story/update/status/${storyId}`);
  return response.data;
}

export const getStoryById = async (storyId: string): Promise<any> => {
  const response = await axiosApi.get<any>(`/story/get/${storyId}`);
  return response.data;
}

export const updateStory = async (storyId: string, data: any): Promise<{ message: string; story: any; success: boolean }> => {
  const response = await axiosApi.put(`/story/update/${storyId}`, data);
  return response.data;
};

export const deleteStory = async (storyId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosApi.delete(`/story/delete/${storyId}`);
  return response.data;
};