"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function AuthorDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6 story-text">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Ready to write your next story?</p>
        </div>
        <Link href="/dashboard/stories/create">
          <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white">
            + Create Story
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📄</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/stories/create">
              <Button className="w-full justify-start bg-[#4DAA57] hover:bg-[#3d8a47] text-white h-12">
                <span className="text-lg mr-2">✨</span>
                Create New Story
              </Button>
            </Link>
            <Link href="/dashboard/stories">
              <Button variant="outline" className="w-full justify-start h-12">
                <span className="text-lg mr-2">📚</span>
                Manage My Stories
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📖</span>
              <span>Recent Stories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">My First Poem</p>
                  <p className="text-sm text-gray-500">Last updated: 2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Published
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Untitled Story</p>
                  <p className="text-sm text-gray-500">Last updated: 1 day ago</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Draft
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Winter Tales</p>
                  <p className="text-sm text-gray-500">Last updated: 3 days ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Published
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Writing Tips */}
      <Card className="border-[#4DAA57] bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Writing Tip</h3>
              <p className="text-gray-700">
                "The first draft is just you telling yourself the story." - Terry Pratchett
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Don't worry about perfection. Just start writing and refine later.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}