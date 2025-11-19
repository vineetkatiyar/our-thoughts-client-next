// hooks/adminPanel/useToggleVisibility.ts
import { updateStoryVisibility } from "@/app/api/adminPanel/adminStoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateStoryVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storyId: string) => updateStoryVisibility(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStories"] });
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      toast.success("Story visibility updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update story visibility"
      );
    }
  });
};
