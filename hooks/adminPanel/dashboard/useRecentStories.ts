import { recentStories } from "@/app/api/adminPanel/authorStoryApi"
import { useQuery } from "@tanstack/react-query"

export const useRecentAuthorStory = () => {
    return useQuery({
        queryKey : ['myStories'],
        queryFn : recentStories,
        staleTime : 2 * 60 * 1000
    })
}