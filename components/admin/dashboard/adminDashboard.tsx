"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import {
  BookOpen,
  Users,
  Edit3,
  CheckCircle,
  Zap,
  BarChart3,
  UserPlus,
  FileText,
  Settings,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/adminPanel/dashboard/useDashboardStats";
import { DashboardLoading } from "./dashboardLoading";

export default function AdminDashboard() {
  const { user } = useUser();
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return <DashboardLoading />;
  }
  if (isError) {
    return <div>Error loading stats.</div>;
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-200">
            Welcome back, {user?.name}! Manage your platform.
          </p>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Authors</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 dark:text-gray-100">
                  {stats.authors}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Published</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 dark:text-gray-100">
                  {stats.published}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
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
              <Zap className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/stories">
              <Button className="w-full justify-start bg-[#4DAA57] hover:bg-[#3d8a47] text-white h-12 cursor-pointer">
                <BookOpen className="w-5 h-5 mr-2" />
                Manage All Stories
              </Button>
            </Link>
            <Link href="/dashboard/stories/create">
              <Button
                variant="outline"
                className="w-full justify-start h-12 cursor-pointer"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Create New Story
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="w-full justify-start h-12 cursor-pointer"
              >
                <Users className="w-5 h-5 mr-2" />
                User Management
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UserPlus className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    New user registered
                  </p>
                  <p className="text-sm text-gray-500">
                    John Doe joined 2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Story published</p>
                  <p className="text-sm text-gray-500">
                    "Winter Tales" by Sarah
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Edit3 className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Story updated</p>
                  <p className="text-sm text-gray-500">
                    Mike edited "My Journey"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Settings className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Admin Tools</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You have full access to manage all stories and users on the
                platform. Use the navigation to access different management
                sections.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
