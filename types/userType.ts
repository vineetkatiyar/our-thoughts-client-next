export type UserRole = "ADMIN" | "AUTHOR" | "READER";
export type UserStatus = "ACTIVE" | "BANNED" | "DEACTIVATED";
export type Visibility = "PUBLIC" | "PRIVATE";

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  visibility: Visibility;
  bio?: string | null;
  avatar?: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface UserFilters {
  search: string | null;
  role: UserRole | null;
  status: UserStatus | null;
  sortBy: "createdAt" | "name";
  sortOrder: "asc" | "desc";
}

export interface GetAllUsersResponse {
  message: string;
  users: User[];
  success: boolean;
  pagination: Pagination;
  filters: UserFilters;
}

export interface GetAllUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "createdAt" | "name";
  sortOrder?: "asc" | "desc";
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  bio?: string | null;
  avatar?: string | null;
}

export interface UpdateUserStatusPayload {
  status: UserStatus;
}

export interface UpdateUserRolePayload {
  role: UserRole;
}
