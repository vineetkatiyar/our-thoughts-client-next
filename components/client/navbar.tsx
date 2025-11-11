"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b story-text md:rounded-full rounded max-w-2xl mx-auto mx-5">
      <div className=" px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <button className="px-4 py-2 rounded-md text-sm font-medium bg-[#4DAA57] text-white transition-colors duration-200">
                <Link href="/signin">Login</Link>
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
              style={{
                color: "#4DAA57",
              }}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 bg-[#4DAA57] text-white">
                <Link href="/signin">Login</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
