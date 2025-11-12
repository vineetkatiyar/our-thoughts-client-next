"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { DashboardLoading } from "@/components/admin/dashboard/dashboardLoading";
import DashboardHeader from "@/components/admin/layout/header";
import DashboardSidebar from "@/components/admin/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isLoading) {
      if (!isAuthenticated) {
        router.push("/signin");
      }
    }
  }, [isAuthenticated, isLoading, isCheckingAuth, router]);

  if (isLoading || isCheckingAuth) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
