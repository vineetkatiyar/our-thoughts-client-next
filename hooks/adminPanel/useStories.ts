import { useQuery } from "@tanstack/react-query";
import { useUser } from "../useUser"
import { StoriesQueryParams } from "@/types/stroyType";
import { getAdminStories, getAuthorStories } from "@/app/api/adminPanel/adminStoryApi";

export const useStories = (params ?: StoriesQueryParams) =>{
    const {isAdmin}  = useUser();

    return useQuery({
        queryKey : isAdmin ? ['allStories',params] : ['myStories',params],
        queryFn : () => isAdmin ? getAdminStories(params) : getAuthorStories(params),
        staleTime : 2 * 60 * 1000
    })
}