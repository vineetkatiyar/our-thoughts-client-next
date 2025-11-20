"use client";

import { SortByOption, SortOrderOption } from "@/types/stroyType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  sortBy: SortByOption;
  sortOrder: SortOrderOption;
  onSortByChange: (value: SortByOption) => void;
  onSortOrderChange: (value: SortOrderOption) => void;
}

const sortOptions = [
  { value: "createdAt" as SortByOption, label: "Date Created" },
  { value: "publishedAt" as SortByOption, label: "Date Published" },
];

export default function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortDropdownProps) {
  return (
    <div className="flex space-x-2">
      {/* Sort By Dropdown */}
      <div className="w-[140px]">
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="h-9 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-0">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="focus:bg-green-50 focus:text-green-900"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Order Button */}
      <button
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors cursor-pointer"
        title={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
      >
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-700">
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </span>
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform ${
              sortOrder === "desc" ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
