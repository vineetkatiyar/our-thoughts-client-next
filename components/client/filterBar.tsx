"use client";

import { FilterOptions, SortByOption, SortOrderOption } from "@/types/stroyType";
import SearchBar from "./searchBar";
import SortDropdown from "./sortBy";

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  resultsCount?: number;
  isLoading?: boolean;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  resultsCount,
  isLoading = false,
}: FilterBarProps) {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleSortByChange = (sortBy: SortByOption) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleSortOrderChange = (sortOrder: SortOrderOption) => {
    onFiltersChange({ ...filters, sortOrder });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 w-full sm:max-w-md">
          <SearchBar
            search={filters.search}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <SortDropdown
            sortBy={filters.sortBy as SortByOption}
            sortOrder={filters.sortOrder as SortOrderOption}
            onSortByChange={handleSortByChange}
            onSortOrderChange={handleSortOrderChange}
          />

          {/* Results Count */}
          {resultsCount !== undefined && (
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                `${resultsCount} ${resultsCount === 1 ? "story" : "stories"}`
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}