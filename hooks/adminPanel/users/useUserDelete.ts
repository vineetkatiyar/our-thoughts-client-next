import { deleteUser } from "@/app/api/adminPanel/adminUsersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        }
    })
}