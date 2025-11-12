"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

const adminMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'All Stories', href: '/dashboard/stories', icon: '📚' },
  { label: 'User Management', href: '/dashboard/users', icon: '👥' },
];

const authorMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'My Stories', href: '/dashboard/stories', icon: '📝' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isAdmin } = useUser();
  
  const menu = isAdmin ? adminMenu : authorMenu;

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen p-6 story-text">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">
          {isAdmin ? 'Admin Panel' : 'My Dashboard'}
        </h2>
      </div>
      
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-[#4DAA57] text-white'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}