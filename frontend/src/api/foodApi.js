import api from "./client";

export const getFoods = async () => {
    const response = await api.get("/foods");
    return response.data;
};

export const getFoodById = async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
};

export const searchFoods = async (keyword) => {
    const response = await api.get("/foods/search", {
        params: { q: keyword }
    });

    return response.data;
};