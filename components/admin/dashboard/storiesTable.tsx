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
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import StoriesTableLoading from "./storiesTableLoading";
import { Story } from "@/types/stroyType";
import { useUpdateStoryVisibility } from "@/hooks/adminPanel/useUpdateVisibilityStatus";
import { useDeleteStory } from "@/hooks/adminPanel/useDeleteStory";
import { useState } from "react";
import StoryViewModal from "./stories/viewStoryModal";
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
import { Trash2, Loader2, View, SquarePen } from "lucide-react";

interface StoriesTableProps {
  stories: Story[];
  isLoading: boolean;
  canEditAll?: boolean;
}

export default function StoriesTable({
  stories,
  isLoading,
  canEditAll,
}: StoriesTableProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const { mutate: toggleVisibility, isPending: isTogglePending } =
    useUpdateStoryVisibility();
  const { mutate: deleteStory, isPending: isDeletePending } = useDeleteStory();

  const handleViewStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStoryId(null);
  };

  const handleDeleteClick = (storyId: string, storyTitle: string) => {
    setStoryToDelete({ id: storyId, title: storyTitle });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (storyToDelete) {
      deleteStory(storyToDelete.id, {
        onSettled: () => {
          setDeleteDialogOpen(false);
          setStoryToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return <StoriesTableLoading />;
  }

  return (
    <>
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              {canEditAll && <TableHead>Author</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={canEditAll ? 6 : 5}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-gray-500 dark:text-gray-100">No stories found</p>
                    <Link href="/dashboard/stories/create">
                      <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white">
                        Create Your First Story
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stories.map((story) => (
                <TableRow key={story.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {story.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{story.slug}</p>
                    </div>
                  </TableCell>

                  {canEditAll && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {story.author.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">
                          {story.author.name}
                        </span>
                      </div>
                    </TableCell>
                  )}

                  <TableCell>
                    <Badge
                      variant={
                        story.status === "PUBLISHED"
                          ? "default"
                          : story.status === "DRAFT"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        story.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : story.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {story.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className={
                          story.visibility === "PUBLIC"
                            ? "border-blue-200 text-blue-700"
                            : "border-gray-200 text-gray-700"
                        }
                      >
                        {story.visibility}
                      </Badge>

                      <Switch
                        checked={story.visibility === "PUBLIC"}
                        onCheckedChange={() => toggleVisibility(story.id)}
                        disabled={isTogglePending}
                        aria-label="Toggle story visibility"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {new Date(story.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(story.updatedAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50 cursor-pointer "
                        onClick={() => handleViewStory(story.id)}
                      >
                        <View />
                      </Button>

                      <Link href={`/dashboard/stories/${story.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#4DAA57] text-[#4DAA57] hover:bg-[#4DAA57] hover:text-white cursor-pointer"
                        >
                          <SquarePen />
                        </Button>
                      </Link>

                      {/* Delete Button with Shadcn AlertDialog */}
                      <AlertDialog
                        open={
                          deleteDialogOpen && storyToDelete?.id === story.id
                        }
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDeleteClick(story.id, story.title)
                            }
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete
                              <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {" "}
                                "{storyToDelete?.title}"
                              </span>
                              and remove it from our servers.
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
                                "Delete Story"
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

      <StoryViewModal
        storyId={selectedStoryId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
