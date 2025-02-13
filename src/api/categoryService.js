import api from "./axiosInstance";
export const getCategories = async () => {
    try {
        const response = await api.get(`/categories`);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};