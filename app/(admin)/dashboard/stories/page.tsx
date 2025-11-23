"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import StoriesTable from "@/components/admin/dashboard/storiesTable";
import { useStories } from "@/hooks/adminPanel/useStories";
import { useEffect, useState } from "react";
import { StoriesAdminQueryParams } from "@/types/stroyType";
import FilterBar from "@/components/client/filterBar";
import Pagination from "@/components/admin/dashboard/pagination";

const DEFAULT_FILTERS: StoriesAdminQueryParams = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

export default function StoriesPage() {
  const [filters, setFilters] =
    useState<StoriesAdminQueryParams>(DEFAULT_FILTERS);
  const { isAdmin } = useUser();

  const { data, isLoading, error } = useStories(filters);

  const stories = data?.data || [];
  const pagination = data?.pagination;
  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.search, filters.sortBy, filters.sortOrder]);

  const handleFiltersChange = (newFilters: StoriesAdminQueryParams) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isAdmin ? "All Stories" : "My Stories"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {isAdmin
              ? "Manage all stories on the platform"
              : "Manage and organize your stories"}
          </p>
        </div>
        <Link href="/dashboard/stories/create">
          <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white whitespace-nowrap cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Create Story
          </Button>
        </Link>
      </div>

      {/* Show error if any */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Error loading stories: {(error as Error).message}
          </p>
        </div>
      )}

      <FilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={pagination?.totalItems}
        isLoading={isLoading}
      />

      {/* Stories Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">
              Stories {pagination && `(${pagination.totalItems})`}
            </CardTitle>
            <div className="text-sm text-gray-500">
              {pagination &&
                `Page ${pagination.currentPage} of ${pagination.totalPages}`}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <StoriesTable
            stories={stories}
            isLoading={isLoading}
            canEditAll={isAdmin}
          />

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              className="border-t"
            />
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <p className="text-gray-500 text-lg">
                {filters.search
                  ? "No stories found matching your search"
                  : "No stories found"}
              </p>
              <Link href="/dashboard/stories/create">
                <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white">
                  Create Your First Story
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
