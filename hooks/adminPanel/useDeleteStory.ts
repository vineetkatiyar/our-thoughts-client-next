import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "@/app/api/adminPanel/adminStoryApi";
import { toast } from "sonner";

export const useDeleteStory = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteStory,
        onSuccess: (data, storyId) => {
            queryClient.invalidateQueries({ queryKey: ['allStories'] });
            queryClient.invalidateQueries({ queryKey: ['myStories'] });
            
            toast.success(data.message || "Story deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete story");
        },
    });
};