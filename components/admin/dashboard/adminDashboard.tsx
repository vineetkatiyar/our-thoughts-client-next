"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function AdminDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6 story-text">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Manage your platform.</p>
        </div>
        <Link href="/dashboard/stories/create">
          <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white">
            + Create Story
          </Button>
        </Link>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">47</p>
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
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Authors</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✍️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">32</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/stories">
              <Button className="w-full justify-start bg-[#4DAA57] hover:bg-[#3d8a47] text-white h-12">
                <span className="text-lg mr-2">📚</span>
                Manage All Stories
              </Button>
            </Link>
            <Link href="/dashboard/users">
              <Button variant="outline" className="w-full justify-start h-12">
                <span className="text-lg mr-2">👥</span>
                User Management
              </Button>
            </Link>
            <Link href="/dashboard/stories/create">
              <Button variant="outline" className="w-full justify-start h-12">
                <span className="text-lg mr-2">✨</span>
                Create New Story
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📊</span>
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">🆕</span>
                <div>
                  <p className="font-medium text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe joined 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">📖</span>
                <div>
                  <p className="font-medium text-gray-900">Story published</p>
                  <p className="text-sm text-gray-500">"Winter Tales" by Sarah</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">✏️</span>
                <div>
                  <p className="font-medium text-gray-900">Story updated</p>
                  <p className="text-sm text-gray-500">Mike edited "My Journey"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Admin Tools</h3>
              <p className="text-gray-700">
                You have full access to manage all stories and users on the platform.
                Use the navigation to access different management sections.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}