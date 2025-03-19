import apiClient from "./base";


export const getPrisoners = async (page = 1, limit = 10, name = null) => {
    try {
        const response = await apiClient.get(`/prisoners`, {
            params: { page, limit, name },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Phạm nhân:", error);
        throw error;
    }
};

export const createPrisoner = async ({ prisonerName, dob = null, pob = null }) => {
    try {
        const response = await apiClient.post(`/prisoners`, {
            prisonerName,
            dob,
            pob,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo Phạm nhân:", error);
        throw error;
    }
};

export const updatePrisoner = async (id, updatedPrisoner) => {
    try {
        const response = await apiClient.put(`/prisoners/${id}`, updatedPrisoner);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật Phạm nhân:", error);
        throw error;
    }
};