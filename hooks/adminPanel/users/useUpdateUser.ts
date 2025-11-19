import { updateUser } from "@/app/api/adminPanel/adminUsersApi";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { user: currentUser, setUser } = useAuthStore();
    return useMutation({
        mutationFn : ({ userId, userData }: { userId: string; userData: any }) =>{
            return updateUser(userId, userData);
        },
        onSuccess: (data, variables) => {
            if (data.user && currentUser?.id === variables.userId) {
                setUser(data.user);
            }
            queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    })
}