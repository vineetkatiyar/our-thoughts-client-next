"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUser();
  const logout = useLogout();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
  };

  // REMOVED the click outside detection completely

  const getUserInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b md:rounded-full rounded max-w-2xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-[#4DAA57] transition-colors duration-200"
            >
              our-thought
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <div className="w-8 h-8 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-200 group-hover:bg-[#3d8a47] cursor-pointer">
                      {getUserInitial()}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link href="/dashboard/profile" className="block">
                        <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </div>
                      </Link>

                      <Link href="/dashboard" className="block">
                        <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </div>
                      </Link>

                      <div className="border-t border-gray-200 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-[#4DAA57] text-white transition-colors duration-200 hover:bg-[#3d8a47]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
              style={{ color: "#4DAA57" }}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Menu - NO AUTO-CLOSE */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {/* Dashboard - Mobile - NO onClick */}
                  <Link href="/dashboard" className="block">
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitial()}
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">
                          {user?.name}
                        </div>
                        <div className="text-xs text-gray-500">Dashboard</div>
                      </div>
                    </div>
                  </Link>

                  {/* Profile - Mobile - NO onClick */}
                  <Link href="/dashboard/profile" className="block">
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </div>
                  </Link>

                  {/* Logout - Mobile - ONLY logout has onClick */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                // Login Button - Mobile - NO onClick
                <Link href="/signin" className="block w-full">
                  <div className="w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 bg-[#4DAA57] text-white hover:bg-[#3d8a47]">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
