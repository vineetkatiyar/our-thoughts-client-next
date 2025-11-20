"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2, Mail, Eye } from "lucide-react";
import { User, UserRole, UserStatus } from "@/types/userType";
import { useUpdateUserStatus } from "@/hooks/adminPanel/users/useUserUpdateStatus";
import { useUpdateUserRole } from "@/hooks/adminPanel/users/useUserUpdateRole";
import { useDeleteUser } from "@/hooks/adminPanel/users/useUserDelete";
import UsersTableLoading from "./usersTableLoading";
import UserViewModal from "./userViewModal";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export default function UsersTable({ users, isLoading }: UsersTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const { mutate: updateStatus, isPending: isStatusPending } =
    useUpdateUserStatus();
  const { mutate: updateRole, isPending: isRolePending } = useUpdateUserRole();
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser();

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    updateStatus({ userId, status: newStatus });
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    if (newRole === "ADMIN" || newRole === "AUTHOR") {
      updateRole({ userId, role: newRole });
    }
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete({ id: user.id, name: user.name, email: user.email });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id, {
        onSettled: () => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return <UsersTableLoading />;
  }

  return (
    <>
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
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-gray-500">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {user.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Mail className="w-4 h-4 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col space-y-2">
                      <Select
                        value={user.role}
                        onValueChange={(value: UserRole) =>
                          handleRoleChange(user.id, value)
                        }
                        disabled={isRolePending}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="AUTHOR">AUTHOR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col space-y-2">
                      <Select
                        value={user.status}
                        onValueChange={(value: UserStatus) =>
                          handleStatusChange(user.id, value)
                        }
                        disabled={isStatusPending}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="BANNED">BANNED</SelectItem>
                          <SelectItem value="DEACTIVATED">
                            DEACTIVATED
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.visibility === "PUBLIC"
                          ? "border-blue-200 text-blue-700"
                          : "border-gray-200 text-gray-700"
                      }
                    >
                      {user.visibility}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      {/* View Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUser(user.id)}
                        className="border-gray-200 text-gray-600 dark:text-gray-100 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Delete Button */}
                      <AlertDialog
                        open={deleteDialogOpen && userToDelete?.id === user.id}
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(user)}
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            disabled={isDeletePending}
                          >
                            {isDeletePending && userToDelete?.id === user.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the user account for
                              <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {" "}
                                {userToDelete?.name}
                              </span>{" "}
                              ({userToDelete?.email}) and remove all their data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeletePending}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleConfirmDelete}
                              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                              disabled={isDeletePending}
                            >
                              {isDeletePending ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete User"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User View Modal */}
      <UserViewModal
        userId={selectedUserId}
        isOpen={viewModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}