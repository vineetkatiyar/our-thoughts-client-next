import { adminDashboardStates, authorDashboardStates } from "@/app/api/adminPanel/dashboardApi";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
    const {isAdmin} = useUser();
    return useQuery({
        queryKey: ['dashBoardStats', isAdmin],
        queryFn : () => isAdmin ? adminDashboardStates() : authorDashboardStates(),
        staleTime : 5 * 60 * 1000
    })
}