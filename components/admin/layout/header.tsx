"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { Menu, LogOut, User, Settings } from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-component";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const logout = useLogout();
  const { user } = useUser();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (action?: () => void) => {
    closeUserMenu();
    if (action) action();
  };

  const getUserInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <header className=" sticky top-0 z-40 bg-white dark:bg-black">
      <div className="flex justify-between items-center px-4 lg:px-6 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 h-9 w-9"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="lg:hidden">
              <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.toLowerCase()}
              </p>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-100 capitalize">
                <Link href="/">{user?.role?.toLowerCase()} Dashboard</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-2">
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 hover:bg-gray-50 h-9 cursor-pointer"
            >
              {/* Mobile: Icon only */}
              <div className="w-6 h-6 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-xs font-medium lg:hidden">
                {getUserInitial()}
              </div>

              {/* Desktop: Avatar + Name */}
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {getUserInitial()}
                </div>
                <span className="text-sm">{user?.name?.split(" ")[0]}</span>
              </div>
            </Button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {/* Profile Link */}
                <Link href="/dashboard/profile">
                  <div
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick()}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </div>
                </Link>

                <div className="border-t border-gray-200 my-1"></div>
                <ModeToggle />
                <div className="border-t border-gray-200 my-1"></div>

                {/* Logout Button */}
                <button
                  onClick={() => handleMenuItemClick(logout)}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
