"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Search, Plus } from "lucide-react";
import StoriesTable from "@/components/admin/dashboard/storiesTable";
import { useStories } from "@/hooks/adminPanel/useStories";

export default function StoriesPage() {
  const { isAdmin } = useUser();
  const { data, isLoading, error } = useStories();
  const stories = data?.data || [];

  return (
    <div className="space-y-6 story-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdmin ? "All Stories" : "My Stories"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin
              ? "Manage all stories on the platform"
              : "Manage and organize your stories"}
          </p>
        </div>
        <Link href="/dashboard/stories/create">
          <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white whitespace-nowrap">
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

      {/* Search and Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">
              Stories {data?.pagination && `(${data.pagination.totalItems})`}
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search stories..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <StoriesTable
            stories={stories}
            isLoading={isLoading}
            canEditAll={isAdmin}
          />
        </CardContent>
      </Card>

      {/* Empty state */}
      {error && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <p className="text-gray-500 text-lg">No stories found</p>
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
