"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Save, Eye, EyeOff, Type, ArrowLeft } from "lucide-react";
import { useCreateStory } from "@/hooks/adminPanel/useCreateStory";
import { useStoryStore } from "@/store/storyStore";
import {
  CreateStoryFormData,
  createStorySchema,
} from "@/lib/validatior/storySchema";
import { MarkdownEditor } from "../editors/simple-markdown-editor";
import { useUpdateStory } from "@/hooks/adminPanel/useEditStoryById";
import { useGetStoryById } from "@/hooks/adminPanel/useGetStoryById";
import { Spinner } from "@/components/ui/spinner";
import { StoryFormSkeleton } from "./storyFromSkeleton";

interface CreateStoryFormProps {
  mode?: "create" | "edit";
  storyId?: string;
}

export default function CreateStoryForm({
  mode = "create",
  storyId,
}: CreateStoryFormProps) {
  const router = useRouter();

  const { mutate: createStory, isPending: isCreatePending } = useCreateStory();
  const { mutate: updateStory, isPending: isUpdatePending } = useUpdateStory();
  const { data: storyData, isLoading: isStoryLoading } = useGetStoryById(
    mode === "edit" ? (storyId ?? null) : null
  );

  const { updateCurrentDraft, saveDraft, error } = useStoryStore();
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const isPending = mode === "create" ? isCreatePending : isUpdatePending;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CreateStoryFormData>({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      title: "",
      content: "",
      status: "DRAFT",
      visibility: "PUBLIC",
    },
    mode: "onChange", // ✅ Real-time validation
  });

  const watchedFields = watch();

  useEffect(() => {
    if (mode === "edit" && storyData?.story) {
      const story = storyData.story;
      reset({
        title: story.title || "",
        content: story.content || "",
        status: story.status || "DRAFT",
        visibility: story.visibility || "PUBLIC",
      });
    }
  }, [mode, storyData, reset]);

  // ✅ FIX: Check if form has minimum valid data
  const hasMinimumData = watchedFields.title.trim().length >= 3 && 
                        watchedFields.content.trim().length > 0;

  const handleAutoSave = () => {
    if (mode === "create" && (watchedFields.title || watchedFields.content)) {
      updateCurrentDraft(watchedFields);
      saveDraft(watchedFields);
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 3000);
    }
  };

  const onSubmit = (data: CreateStoryFormData) => {
    if (mode === "create") {
      createStory(data, {
        onSuccess: () => {
          router.push("/dashboard/stories");
        },
      });
    } else if (mode === "edit" && storyId) {
      updateStory(
        { storyId, data },
        {
          onSuccess: () => {
            router.push("/dashboard/stories");
          },
        }
      );
    }
  };

  // ✅ FIX: Remove problematic keydown handlers
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow default behavior for title textarea
    if (e.key === "Enter") {
      e.stopPropagation(); // Only prevent form submission, not textarea behavior
    }
  };

  const handleSaveDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAutoSave();
  };

  const getSubmitButtonText = () => {
    if (isPending) {
      return mode === "create" ? "Creating..." : "Updating...";
    }

    if (watchedFields.status === "PUBLISHED") {
      return mode === "create" ? "Publish Story" : "Update & Publish";
    }

    return mode === "create" ? "Save Story" : "Update Story";
  };

  // ✅ FIX: Better button disabled logic
  const isSubmitDisabled = 
    isPending || 
    !hasMinimumData || 
    (mode === "edit" && !isDirty);

  if (mode === "edit" && isStoryLoading) {
    return <StoryFormSkeleton />;
  }

  return (
    <div className="space-y-4 lg:space-y-6 p-2 lg:p-0">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-3">
          {/* Back Button - Mobile Only */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/stories")}
            className="lg:hidden p-2 h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mode === "create" ? "Create Story" : "Edit Story"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base mt-1 hidden sm:block">
              {mode === "create"
                ? "Share your creativity"
                : "Update your story"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 w-full sm:w-auto justify-between sm:justify-normal">
          {isDraftSaved && mode === "create" && (
            <span className="text-xs lg:text-sm text-green-600 flex items-center gap-1">
              <Save className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Draft saved</span>
              <span className="sm:hidden">Saved</span>
            </span>
          )}

          {mode === "create" && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={!hasMinimumData || isPending}
              size="sm"
              className="text-xs lg:text-sm"
            >
              <Save className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Draft</span>
            </Button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 lg:p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <p className="font-medium text-sm lg:text-base">Error: {error}</p>
          </div>
        </div>
      )}

      {/* ✅ FIX: Remove problematic form onKeyDown */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Title Input */}
            <Card className="border-0 lg:border shadow-sm lg:shadow">
              <CardHeader className="">
                <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                  <Type className="w-4 h-4 lg:w-5 lg:h-5" />
                  Story Title
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Textarea
                  {...register("title")}
                  placeholder="Enter a captivating title..."
                  className="min-h-[60px] lg:min-h-[80px] resize-y font-serif leading-relaxed border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-1 text-lg lg:text-xl"
                  onBlur={handleAutoSave}
                  onKeyDown={handleTitleKeyDown} // ✅ FIX: Better keydown handler
                />
                {errors.title && (
                  <p className="text-red-600 text-xs lg:text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                    {errors.title.message}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2 text-xs lg:text-sm text-gray-500">
                  <span>
                    {watchedFields.title.length} chars
                    {watchedFields.title.length < 3 && ` (min 3)`}
                  </span>
                  <span className="hidden lg:inline">Make it memorable</span>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="border-0 lg:border shadow-sm lg:shadow">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="text-base lg:text-lg">Content</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <MarkdownEditor
                  value={watchedFields.content}
                  onChange={(value) =>
                    setValue("content", value, { shouldValidate: true, shouldDirty: true })
                  }
                  onBlur={handleAutoSave}
                  placeholder="Start writing your story..."
                />
                {errors.content && (
                  <p className="text-red-600 text-xs lg:text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                    {errors.content.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Mobile: Bottom, Desktop: Right */}
          <div className="space-y-4 lg:space-y-6">
            {/* Publish Settings */}
            <Card className="border-0 lg:border shadow-sm lg:shadow">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="text-base lg:text-lg">
                  Publish Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6 pt-0">
                {/* Status */}
                <div className="space-y-2 lg:space-y-3">
                  <Label htmlFor="status" className="text-sm lg:text-base">
                    Status
                  </Label>
                  <RadioGroup
                    value={watchedFields.status}
                    onValueChange={(value: "DRAFT" | "PUBLISHED") =>
                      setValue("status", value, { shouldValidate: true, shouldDirty: true })
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="DRAFT" id="draft" />
                      <Label
                        htmlFor="draft"
                        className="cursor-pointer text-sm lg:text-base"
                      >
                        Draft - Save for later
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PUBLISHED" id="published" />
                      <Label
                        htmlFor="published"
                        className="cursor-pointer text-sm lg:text-base"
                      >
                        Published - Make it live
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Visibility */}
                <div className="space-y-2 lg:space-y-3">
                  <Label htmlFor="visibility" className="text-sm lg:text-base">
                    Visibility
                  </Label>
                  <RadioGroup
                    value={watchedFields.visibility}
                    onValueChange={(value: "PUBLIC" | "PRIVATE") =>
                      setValue("visibility", value, { shouldValidate: true, shouldDirty: true })
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PUBLIC" id="public" />
                      <Label
                        htmlFor="public"
                        className="cursor-pointer flex items-center gap-2 text-sm lg:text-base"
                      >
                        <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        Public - Anyone can read
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PRIVATE" id="private" />
                      <Label
                        htmlFor="private"
                        className="cursor-pointer flex items-center gap-2 text-sm lg:text-base"
                      >
                        <EyeOff className="w-3 h-3 lg:w-4 lg:h-4" />
                        Private - Only you can see
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 lg:border shadow-sm lg:shadow sticky bottom-2 lg:static backdrop-blur-sm lg:backdrop-blur-none z-10">
              <CardContent className="p-4 lg:p-6">
                <div className="space-y-2 lg:space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#4DAA57] hover:bg-[#3d8a47] text-white text-sm lg:text-base cursor-pointer"
                    disabled={isSubmitDisabled}
                    size="lg"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Spinner className="w-4 h-4 text-white" />
                        <span className="hidden sm:inline">
                          {mode === "create" ? "Creating..." : "Updating..."}
                        </span>
                        <span className="sm:hidden">
                          {mode === "create" ? "Creating" : "Updating"}
                        </span>
                      </div>
                    ) : (
                      getSubmitButtonText()
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm lg:text-base"
                    onClick={() => router.push("/dashboard/stories")}
                    disabled={isPending}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}