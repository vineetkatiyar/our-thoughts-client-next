"use client";

import AdminDashboard from "@/components/admin/dashboard/adminDashboard";
import AuthorDashboard from "@/components/admin/dashboard/authorDashboard";
import { DashboardLoading } from "@/components/admin/dashboard/dashboardLoading";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  const { isLoading, isAdmin } = useUser();

  if (isLoading) {
    return <DashboardLoading />;
  }
  return (
    <div className="space-y-6">
      {isAdmin ? <AdminDashboard /> : <AuthorDashboard />}
    </div>
  );
}
