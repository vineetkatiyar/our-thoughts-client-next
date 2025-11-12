"use client";

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';

export default function DashboardHeader() {
  const logout = useLogout();
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 story-text">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm text-gray-600 capitalize">
            {user?.role?.toLowerCase()} Dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={logout}
            className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer hover:text-red-600 "
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}