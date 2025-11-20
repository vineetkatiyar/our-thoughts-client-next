"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersTableLoading() {
  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {/* User Column */}
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </TableCell>
              
              {/* Role Column */}
              <TableCell>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </TableCell>
              
              {/* Status Column */}
              <TableCell>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </TableCell>
              
              {/* Visibility Column */}
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              
              {/* Joined Date Column */}
              <TableCell>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </TableCell>
              
              {/* Actions Column */}
              <TableCell>
                <div className="flex justify-center">
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}