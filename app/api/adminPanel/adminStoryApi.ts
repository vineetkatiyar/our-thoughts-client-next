import { StoriesQueryParams, StoriesResponse } from "@/types/stroyType";
import axiosApi from "../axios";

export const getAdminStories = async (params?: StoriesQueryParams): Promise<StoriesResponse> => {
  const response = await axiosApi.get("/story/admin/get/all-story", { params });
  return response.data;
};

export const getAuthorStories = async (params?: StoriesQueryParams): Promise<StoriesResponse> => {
  try {
    const response = await axiosApi.get("/story/author/get/my-stories", { params });
    const authorData = response.data;
    const transformedResponse: StoriesResponse = {
      message: authorData.message,
      data: authorData.stories || [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: authorData.stories?.length || 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
      },
      filters: {
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc"
      },
      success: authorData.success
    };

    return transformedResponse;
  } catch (error) {
    console.error("Author API Error:", error);
    throw error;
  }
};