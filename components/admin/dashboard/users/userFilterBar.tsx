"use client";

import { GetAllUsersQueryParams, UserRole, UserStatus } from "@/types/userType";
import SearchBar from "@/components/client/searchBar";
import UsersRoleFilter from "./usersRoleFilter";
import UsersStatusFilter from "./usersStatusFilter";
import UsersSortDropdown from "./usersSortDropDown";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface UsersFilterBarProps {
  filters: GetAllUsersQueryParams;
  onFiltersChange: (filters: GetAllUsersQueryParams) => void;
  resultsCount?: number;
  isLoading?: boolean;
}

export default function UsersFilterBar({
  filters,
  onFiltersChange,
  resultsCount,
  isLoading = false,
}: UsersFilterBarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleSortByChange = (sortBy: GetAllUsersQueryParams["sortBy"]) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleSortOrderChange = (sortOrder: GetAllUsersQueryParams["sortOrder"]) => {
    onFiltersChange({ ...filters, sortOrder });
  };

  const handleRoleChange = (role: UserRole | undefined) => {
    onFiltersChange({ ...filters, role });
  };

  const handleStatusChange = (status: UserStatus | undefined) => {
    onFiltersChange({ ...filters, status });
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200">
      {/* Desktop Layout - Unchanged */}
      <div className="hidden sm:flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <SearchBar
            search={filters.search || ""}
            onSearchChange={handleSearchChange}
            placeholder="Search users by name or email..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <UsersRoleFilter
            role={filters.role}
            onRoleChange={handleRoleChange}
          />
          
          <UsersStatusFilter
            status={filters.status}
            onStatusChange={handleStatusChange}
          />

          <UsersSortDropdown
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortByChange={handleSortByChange}
            onSortOrderChange={handleSortOrderChange}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        {/* Top Row: Search + Filter Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar
              search={filters.search || ""}
              onSearchChange={handleSearchChange}
              placeholder="Search users..."
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMobileFilters}
            className="flex items-center gap-1 border-gray-300"
          >
            <Filter className="h-4 w-4" />
            {isMobileFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Collapsible Filter Options */}
        {isMobileFiltersOpen && (
          <div className="space-y-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <UsersRoleFilter
                role={filters.role}
                onRoleChange={handleRoleChange}
              />
              
              <UsersStatusFilter
                status={filters.status}
                onStatusChange={handleStatusChange}
              />
            </div>

            <UsersSortDropdown
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}