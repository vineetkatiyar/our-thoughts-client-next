"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import {
  BookOpen,
  CheckCircle,
  FileText,
  Rocket,
  Plus,
  Library,
  Lightbulb,
  Clock,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/adminPanel/dashboard/useDashboardStats";
import { DashboardLoading } from "./dashboardLoading";
import { useRecentAuthorStory } from "@/hooks/adminPanel/dashboard/useRecentStories";
import { Story } from "@/types/stroyType";

export default function AuthorDashboard() {
  const { user } = useUser();
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useDashboardStats();
  const {
    data: storiesData,
    isLoading: storiesLoading,
    isError: storiesError,
  } = useRecentAuthorStory();

  if (statsLoading) {
    return <DashboardLoading />;
  }

  if (statsError) {
    return <div>Error loading stats.</div>;
  }

  // ✅ Get latest 3 stories from API response
  const recentStories = storiesData?.stories?.slice(0, 3) || [];

  // ✅ Format date function
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  // ✅ Get status badge color
  const getStatusBadge = (status: string) => {
    if (status === "PUBLISHED") {
      return "bg-green-100 text-green-800";
    } else if (status === "DRAFT") {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {user?.name}! Ready to write your next story?
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Stories
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.totalStories}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Published</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.published}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Drafts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.drafts}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 hidden md:block">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/stories/create">
              <Button className="w-full justify-start bg-[#4DAA57] hover:bg-[#3d8a47] text-white h-12 cursor-pointer">
                <Plus className="w-5 h-5 mr-2" />
                Create New Story
              </Button>
            </Link>
            <Link href="/dashboard/stories">
              <Button
                variant="outline"
                className="w-full justify-start h-12 cursor-pointer"
              >
                <Library className="w-5 h-5 mr-2" />
                Manage My Stories
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Recent Stories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {storiesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-muted rounded-lg animate-pulse"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : storiesError ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-300">
                Error loading recent stories
              </div>
            ) : recentStories.length > 0 ? (
              <div className="space-y-4">
                {recentStories.map((story: Story) => (
                  <div
                    key={story.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{story.title}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last updated: {formatTimeAgo(story.updatedAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(story.status)}`}
                    >
                      {story.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No stories found. Create your first story!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Writing Tips */}
      <Card className="border-[#4DAA57] bg-green-50 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-[#4DAA57] mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">Writing Tip</h3>
              <p className="text-gray-700 dark:text-gray-300">
                "The first draft is just you telling yourself the story." -
                Terry Pratchett
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Don't worry about perfection. Just start writing and refine
                later.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
