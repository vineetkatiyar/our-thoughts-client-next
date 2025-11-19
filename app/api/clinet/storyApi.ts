import { CreateStoryRequest, CreateStoryResponse, StoriesQueryParams, StoriesResponse } from "@/types/stroyType";
import axiosApi from "../axios";

export async function getPublicFeed(
  params: StoriesQueryParams & { pageParam?: number }
): Promise<StoriesResponse> {
  const { pageParam = 1, search = '', sortBy = 'publishedAt', sortOrder = 'desc' } = params;

  const queryParams = new URLSearchParams({
    page: pageParam.toString(),
    search,
    sortBy,
    sortOrder,
  });

  const response = await axiosApi.get(`/story/public?${queryParams}`);

  if (!response.data) {
    throw new Error('Failed to fetch stories');
  }
  return response.data;
}

export const createStory = async (data: CreateStoryRequest) => {
  const response = await axiosApi.post<CreateStoryResponse>("/story/create", data);
  console.log("API Response:", response);
  return response.data;
}