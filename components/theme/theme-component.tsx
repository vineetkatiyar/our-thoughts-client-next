"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="
            relative
            h-9 w-9
            sm:h-10 sm:w-10
            rounded-md
            border border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-gray-400
            focus:ring-offset-2
            dark:focus:ring-gray-500
            dark:focus:ring-offset-gray-900
            mx-2 cursor-pointer
          "
        >
          <Sun className="
            h-4 w-4
            sm:h-[1.2rem] sm:w-[1.2rem]
            scale-100 
            rotate-0 
            transition-all 
            dark:scale-0 
            dark:-rotate-90
          " />
          <Moon className="
            absolute
            h-4 w-4
            sm:h-[1.2rem] sm:w-[1.2rem]
            scale-0 
            rotate-90 
            transition-all 
            dark:scale-100 
            dark:rotate-0
          " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="
          w-32
          bg-white
          dark:bg-gray-900
          border border-gray-200
          dark:border-gray-700
          shadow-lg
          rounded-md
          p-1
          z-50
        "
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="
            flex
            items-center
            gap-2
            px-3 py-2
            text-sm
            rounded-sm
            cursor-pointer
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition-colors
            duration-150
            focus:bg-gray-100
            dark:focus:bg-gray-800
            focus:outline-none
          "
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="
            flex
            items-center
            gap-2
            px-3 py-2
            text-sm
            rounded-sm
            cursor-pointer
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition-colors
            duration-150
            focus:bg-gray-100
            dark:focus:bg-gray-800
            focus:outline-none
          "
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="
            flex
            items-center
            gap-2
            px-3 py-2
            text-sm
            rounded-sm
            cursor-pointer
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition-colors
            duration-150
            focus:bg-gray-100
            dark:focus:bg-gray-800
            focus:outline-none
          "
        >
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="h-3 w-3 border border-current rounded-sm" />
          </div>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}