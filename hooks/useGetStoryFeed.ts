"use client";

import { getPublicFeed } from "@/app/api/clinet/storyApi";
import { FilterOptions, StoriesResponse } from "@/types/stroyType";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useStories(filters: FilterOptions) {
  const { search, sortBy, sortOrder } = filters;

  return useInfiniteQuery({
    queryKey: ["publicStories", search, sortBy, sortOrder],
    queryFn: ({ pageParam = 1 }): Promise<StoriesResponse> => 
      getPublicFeed({ 
        pageParam, 
        search,
        sortBy,
        sortOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: StoriesResponse) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}