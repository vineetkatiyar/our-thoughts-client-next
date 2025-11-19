import axiosApi from "../axios"

export const authorDashboardStates = async() => {
    const response = await axiosApi.get('/dashboard/author/stats');
    return response.data;
}

export const adminDashboardStates = async() => {
    const response = await axiosApi.get('/dashboard/admin/stats');
    return response.data;
}
