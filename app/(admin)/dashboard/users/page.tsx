"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Pagination from "@/components/admin/dashboard/pagination";
import { GetAllUsersQueryParams } from "@/types/userType";
import { useGetUsers } from "@/hooks/adminPanel/users/useGetUsers";
import UsersFilterBar from "@/components/admin/dashboard/users/userFilterBar";
import UsersTable from "@/components/admin/dashboard/users/userTable";

const DEFAULT_FILTERS: GetAllUsersQueryParams = {
  page: 1,
  limit: 10,
  search: "",
  role: undefined,
  status: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export default function UsersPage() {
  const [filters, setFilters] =
    useState<GetAllUsersQueryParams>(DEFAULT_FILTERS);
  const { isAdmin } = useUser();

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Access Denied
            </h2>
            <p className="text-gray-600 mt-2">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data, isLoading, error } = useGetUsers(filters);

  const users = data?.users || [];
  const pagination = data?.pagination;

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [
    filters.search,
    filters.role,
    filters.status,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const handleFiltersChange = (newFilters: GetAllUsersQueryParams) => {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage all users on the platform</p>
        </div>
      </div>

      {/* Show error if any */}
      {error && (
        <div className="bg-red-50 dark:bg-red-800 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Error loading users: {(error as Error).message}
          </p>
        </div>
      )}

      {/* Filter Bar */}
      <UsersFilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={pagination?.totalItems}
        isLoading={isLoading}
      />

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg hidden sm:block">
              Users {pagination && `(${pagination.totalItems})`}
            </CardTitle>
            <div className="text-sm text-gray-500">
              {pagination &&
                `Page ${pagination.currentPage} of ${pagination.totalPages}`}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <UsersTable users={users} isLoading={isLoading} />

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

      {!isLoading && users.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <p className="text-gray-500 text-lg">
                {filters.search || filters.role || filters.status
                  ? "No users found matching your filters"
                  : "No users found"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
