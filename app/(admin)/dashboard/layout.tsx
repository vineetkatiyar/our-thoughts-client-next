// app/dashboard/layout.tsx (Alternative - Fixed Sidebar)
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isLoading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, isLoading, isCheckingAuth, router]);

  if (isLoading || isCheckingAuth) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-sm h-[73px]">
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 pt-[73px]"> {/* Add padding top for fixed header */}
        {/* Desktop Sidebar - Fixed */}
        <div className="hidden lg:block">
          <div className="fixed top-[73px] left-0 bottom-0 w-64 border-r border-gray-200 overflow-y-auto">
            <DashboardSidebar />
          </div>
        </div>
        
        {/* Mobile Sidebar - Sheet overlay */}
        <DashboardSidebar 
          mobile 
          isOpen={isMobileSidebarOpen} 
          onClose={() => setIsMobileSidebarOpen(false)} 
        />
        
        {/* Main Content - Scrollable with proper margin */}
        <main className="flex-1 md:p-4 px-2 lg:p-6 lg:ml-64 overflow-auto"> {/* Add margin for fixed sidebar */}
          {children}
        </main>
      </div>
    </div>
  );
}