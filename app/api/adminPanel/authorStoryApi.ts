import axiosApi from "../axios"

export const recentStories = async() => {
    const response = await axiosApi.get(`/story/author/get/my-stories`)
    console.log("Recent Stories API Response:", response);
    return response.data
}