export interface Author {
    id: string;
    name: string;
  }
  
  export interface Story {
    id: string;
    slug: string;
    title: string;
    content: string;
    coverImage: string | null;
    status: "PUBLISHED" | "DRAFT";
    visibility: "PUBLIC" | "PRIVATE";
    publishedAt: string | null;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
  }
  
  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
  
  export interface Filters {
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }
  
  export type SortByOption = 'createdAt' | 'publishedAt' | 'title' | 'author';
  export type SortOrderOption = 'asc' | 'desc';
  
  export interface StoriesResponse {
    message: string;
    data: Story[];
    pagination: Pagination;
    filters: Filters;
    success: boolean;
  }

  export interface StoryDetailResponse {
    message: string;
    data: Story;
    success: boolean;
  }
  
  export interface StoriesQueryParams {
    page?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
  
  // Filter options for the UI
  export interface FilterOptions {
    search: string;
    sortBy: SortByOption;
    sortOrder: SortOrderOption;
  }