import { createStory } from '@/app/api/clinet/storyApi';
import { useStoryStore } from '@/store/storyStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export const useCreateStory = () => {
  const queryClient = useQueryClient();
  const { setLoading, setError, clearCurrentDraft } = useStoryStore();

  return useMutation({
    mutationFn: createStory,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['allStories'] });
      queryClient.invalidateQueries({ queryKey: ['myStories'] });
      clearCurrentDraft();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};