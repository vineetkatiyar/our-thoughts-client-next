"use client";

import { UserStatus } from "@/types/userType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersStatusFilterProps {
  status: UserStatus | undefined;
  onStatusChange: (status: UserStatus | undefined) => void;
}

export default function UsersStatusFilter({
  status,
  onStatusChange,
}: UsersStatusFilterProps) {
  return (
    <div className="w-[160px]">
      <Select value={status || "all"} onValueChange={(value) => onStatusChange(value === "all" ? undefined : value as UserStatus)}>
        <SelectTrigger className="h-9 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-0">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="focus:bg-green-50 focus:text-green-900">
            All Status
          </SelectItem>
          <SelectItem value="ACTIVE" className="focus:bg-green-50 focus:text-green-900">
            Active
          </SelectItem>
          <SelectItem value="BANNED" className="focus:bg-green-50 focus:text-green-900">
            Banned
          </SelectItem>
          <SelectItem value="DEACTIVATED" className="focus:bg-green-50 focus:text-green-900">
            Deactivated
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}