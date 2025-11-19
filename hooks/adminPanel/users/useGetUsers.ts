import { getAllUsers } from "@/app/api/adminPanel/adminUsersApi";
import { GetAllUsersQueryParams } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (params?: GetAllUsersQueryParams) => {
  return useQuery({
    queryKey: ["allUsers", params],
    queryFn: () => getAllUsers(params),
    staleTime: 2 * 60 * 1000,
  });
};


