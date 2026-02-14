"use client";

import { useStories } from "@/hooks/useGetStoryFeed";
import { FilterOptions, Story } from "@/types/stroyType";
import { useRef, useEffect, useState, useCallback } from "react";
import FilterBar from "./filterBar";
import StoryCard from "./storyCard";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Feed() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const debouncedSearch = useDebounce(filters.search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useStories({
    ...filters,
    search: debouncedSearch,
  });

  const allStories: Story[] = data?.pages.flatMap((page) => page.data) || [];

  const totalStories = data?.pages[0]?.pagination.totalItems || 0;

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }, []);

  return (
    <div className=" md:px-4 px-2 py-6">
      <FilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={isLoading ? undefined : totalStories}
        isLoading={isLoading}
      />

      {isLoading && !data && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="#4DAA57"
                strokeWidth="4"
              ></circle>
              <path
                d="M4 12a8 8 0 018-8"
                stroke="#4DAA57"
                strokeWidth="4"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">
            Failed to load stories
          </div>
          <p className="text-red-500 text-sm mb-4">
            {error?.message || "Please try again later"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-4">
          {allStories.map((story: Story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      {!isLoading && allStories.length === 0 && filters.search && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No stories found</div>
          <p className="text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {!isLoading && allStories.length === 0 && !filters.search && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No stories yet</div>
          <p className="text-gray-400">
            Be the first to share your story with the community!
          </p>
        </div>
      )}

      <div ref={sentinelRef} style={{ height: "1px" }} aria-hidden="true" />

      {isFetchingNextPage && (
        <div
          className="flex justify-center py-8"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <svg
              className="animate-spin h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="#4DAA57"
                strokeWidth="4"
              ></circle>
              <path
                d="M4 12a8 8 0 018-8"
                stroke="#4DAA57"
                strokeWidth="4"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {!hasNextPage && allStories.length > 0 && (
        <div className="text-center py-8 text-gray-500 border-t border-gray-200 mt-8">
          You've reached the end of the feed
        </div>
      )}
    </div>
  );
}
