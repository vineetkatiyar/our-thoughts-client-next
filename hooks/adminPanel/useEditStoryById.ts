import { updateStory } from "@/app/api/adminPanel/adminStoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateStory = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ storyId, data }: { storyId: string; data: any }) => 
            updateStory(storyId, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['allStories'] });
            queryClient.invalidateQueries({ queryKey: ['myStories'] });
            queryClient.invalidateQueries({ queryKey: ['story', variables.storyId] });
            
            toast.success(data.message || "Story updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update story");
        },
    });
};