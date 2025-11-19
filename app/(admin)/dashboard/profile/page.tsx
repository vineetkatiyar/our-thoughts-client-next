// app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useUser";
import { useUpdateUser } from "@/hooks/adminPanel/users/useUpdateUser";
import { UpdateUserPayload } from "@/types/userType";
import { Loader2, Edit, Save, X, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserPayload>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const { user: currentUser } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (field: keyof UpdateUserPayload, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (currentUser?.id && formData) {
      // Prepare data - convert empty strings to null for optional fields
      const apiData: UpdateUserPayload = {
        name: formData.name || undefined,
        email: formData.email || undefined,
        bio: formData.bio || "",
        avatar: formData.avatar || "", 
      };

      updateUser(
        {
          userId: currentUser.id,
          userData: apiData,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        avatar: currentUser.avatar || "",
      });
    }
    setIsEditing(false);
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

  const isValidUrl = (string: string) => {
    if (!string) return false;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Safe access to bio and avatar with fallbacks
  const userBio = currentUser?.bio || "";
  const userAvatar = currentUser?.avatar || "";

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#4DAA57]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#4DAA57] hover:bg-[#3d8a47]"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                isUpdating ||
                (!!formData.avatar && !isValidUrl(formData.avatar))
              }
              className="bg-[#4DAA57] hover:bg-[#3d8a47]"
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Header */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {userAvatar && isValidUrl(userAvatar) ? (
                <img
                  src={userAvatar}
                  alt={`${currentUser.name}'s avatar`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-2xl font-medium border-2 border-gray-200">
                  {currentUser.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your name"
                      required
                      className="max-w-md"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      required
                      className="max-w-md"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {currentUser.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {currentUser.email}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-2xl">
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
                placeholder="Tell us about yourself (optional)"
                rows={4}
                className="resize-none"
              />
            ) : (
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg min-h-[100px] border border-gray-200">
                {userBio || "No bio provided"}
              </p>
            )}
          </div>

          {/* User Metadata - Read Only */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 max-w-2xl">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Role
              </Label>
              <Badge className={getRoleBadgeClass(currentUser.role)}>
                {currentUser.role}
              </Badge>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Status
              </Label>
              <Badge className={getStatusBadgeClass(currentUser.status)}>
                {currentUser.status}
              </Badge>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Visibility
              </Label>
              <Badge
                variant="outline"
                className={
                  currentUser.visibility === "PUBLIC"
                    ? "border-blue-200 text-blue-700 bg-blue-50"
                    : "border-gray-200 text-gray-700 bg-gray-50"
                }
              >
                {currentUser.visibility}
              </Badge>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Joined Date
              </Label>
              <div className="flex items-center text-gray-700 md:text-sm text-xs">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-4 border-t border-gray-200 max-w-2xl">
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(currentUser.updatedAt).toLocaleDateString()} at{" "}
              {new Date(currentUser.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
