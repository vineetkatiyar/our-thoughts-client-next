import { updateUserStatus } from "@/app/api/adminPanel/adminUsersApi";
import { UserStatus } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ userId, status }: { userId: string; status: UserStatus }) => {
            return updateUserStatus(userId, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        }
    })
}