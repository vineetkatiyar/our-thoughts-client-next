"use client";

import { UserRole } from "@/types/userType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersRoleFilterProps {
  role: UserRole | undefined;
  onRoleChange: (role: UserRole | undefined) => void;
}

export default function UsersRoleFilter({
  role,
  onRoleChange,
}: UsersRoleFilterProps) {
  return (
    <div className="w-[140px]">
      <Select value={role || "all"} onValueChange={(value) => onRoleChange(value === "all" ? undefined : value as UserRole)}>
        <SelectTrigger className="h-9 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-0">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="focus:bg-green-50 focus:text-green-900">
            All Roles
          </SelectItem>
          <SelectItem value="ADMIN" className="focus:bg-green-50 focus:text-green-900">
            Admin
          </SelectItem>
          <SelectItem value="AUTHOR" className="focus:bg-green-50 focus:text-green-900">
            Author
          </SelectItem>
          <SelectItem value="READER" className="focus:bg-green-50 focus:text-green-900">
            Reader
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}