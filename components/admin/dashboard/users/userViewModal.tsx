"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetUserById } from "@/hooks/adminPanel/users/useGetUserById";
import { User, UpdateUserPayload } from "@/types/userType";
import { useUpdateUser } from "@/hooks/adminPanel/users/useUpdateUser";
import { useState, useEffect } from "react";
import { Loader2, Edit, Save, X, Mail, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface UserViewModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserViewModal({
  userId,
  isOpen,
  onClose,
}: UserViewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserPayload>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const { data: userData, isLoading, error } = useGetUserById(userId);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const user = userData?.user;

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (field: keyof UpdateUserPayload, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (userId && formData) {
      updateUser(
        { userId, userData: formData },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      email: "",
      bio: "",
      avatar: "",
    });
    onClose();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (user) {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          bio: user.bio || "",
          avatar: user.avatar || "",
        });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "AUTHOR":
        return "bg-blue-100 text-blue-800";
      case "READER":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "BANNED":
        return "bg-red-100 text-red-800";
      case "DEACTIVATED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="text-left">
            {isEditing ? "Edit User" : "User Details"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#4DAA57]" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">
              Error loading user details: {(error as Error).message}
            </p>
          </div>
        )}

        {user && !isLoading && (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-xl font-medium">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter user name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter user email"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label
                htmlFor="bio"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Bio
              </Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Enter user bio"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[80px]">
                  {user.bio || "No bio provided"}
                </p>
              )}
            </div>

            {/* User Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Role
                </Label>
                <Badge className={getRoleBadgeClass(user.role)}>
                  {user.role}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Status
                </Label>
                <Badge className={getStatusBadgeClass(user.status)}>
                  {user.status}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </Label>
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
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Joined Date
                </Label>
                <div className="flex items-center text-gray-700 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date(user.updatedAt).toLocaleDateString()} at{" "}
                {new Date(user.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}

        {/* Edit/Save/Cancel Buttons at Bottom Right */}
        <DialogFooter className="flex flex-row justify-end gap-2 pt-4 border-t border-gray-200">
          {!isEditing ? (
            <Button
              onClick={handleEditToggle}
              disabled={isUpdating || isLoading}
              className="bg-[#4DAA57] hover:bg-[#3d8a47] cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit User
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleEditToggle}
                disabled={isUpdating}
                className="cursor-pointer"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-[#4DAA57] hover:bg-[#3d8a47] cursor-pointer"
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
