import { updateUserRole } from "@/app/api/adminPanel/adminUsersApi";
import { UserRole } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ userId, role }: { userId: string; role: UserRole }) => {
            return updateUserRole(userId, role);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        }
    })
}