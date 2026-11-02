
import api from "./client";

// Đăng ký
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

// Đăng nhập
export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

// Lấy thông tin tài khoản hiện tại
export const getProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export default {
    registerUser,
    loginUser,
    getProfile
};
