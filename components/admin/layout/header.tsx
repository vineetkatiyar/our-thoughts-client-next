"use client";

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';
import { Menu, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const logout = useLogout();
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center px-4 lg:px-6 py-3">
        {/* Left Side - Menu + Name */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu - Mobile Only */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 h-9 w-9"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            {/* Mobile: Only Name */}
            <div className="lg:hidden">
              <h1 className="text-base font-semibold text-gray-900">
                {user?.name?.split(' ')[0]} {/* First name only */}
              </h1>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.toLowerCase()}
              </p>
            </div>
            
            {/* Desktop: Full Welcome */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-gray-600 capitalize">
                {user?.role?.toLowerCase()} Dashboard
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Side - Logout */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={logout}
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 text-xs lg:text-sm cursor-pointer "
          >
            {/* Mobile: Icon only */}
            <LogOut className="h-4 w-4 lg:hidden" />
            {/* Desktop: Text */}
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}