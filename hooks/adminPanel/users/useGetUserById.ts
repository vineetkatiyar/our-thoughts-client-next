import { getUserById } from "@/app/api/adminPanel/adminUsersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string | null) => {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: () => getUserById(userId as string),
      enabled: !!userId,
      staleTime: 5 * 60 * 1000,
    });
  };