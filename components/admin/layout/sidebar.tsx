"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BookA, HousePlus, LayoutDashboard, User } from "lucide-react";

const adminMenu = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { label: "All Stories", href: "/dashboard/stories", icon: <BookA /> },
  { label: "User Management", href: "/dashboard/users", icon: <User /> },
  { label: "Home", href: "/", icon: <HousePlus /> },
];

const authorMenu = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { label: "My Stories", href: "/dashboard/stories", icon: <BookA /> },
  { label: "Home", href: "/", icon: <HousePlus /> },
];

interface DashboardSidebarProps {
  mobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  mobile = false,
  isOpen = false,
  onClose = () => {},
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { isAdmin } = useUser();

  const menu = isAdmin ? adminMenu : authorMenu;

  if (!mobile) {
    return (
      <aside className="w-60 h-full ">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {isAdmin ? "Admin Panel" : "My Dashboard"}
            </h2>
          </div>

          <nav className="space-y-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-[#4DAA57] text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  // Mobile Sidebar - Sheet
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {isAdmin ? "Admin Panel" : "My Dashboard"}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-[#4DAA57] text-white"
                    : "text-gray-700 dark:text-gray-300 dark:hover:bg-muted hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
