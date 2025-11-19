import { getStoryById } from "@/app/api/adminPanel/adminStoryApi"
import { useQuery } from "@tanstack/react-query"

export const useGetStoryById = (storyId : string | null) =>{
    return useQuery({
        queryKey: ['story', storyId],
        queryFn: () => getStoryById(storyId as string),
        enabled: !!storyId,
        staleTime: 5 * 60 * 1000
    })
}