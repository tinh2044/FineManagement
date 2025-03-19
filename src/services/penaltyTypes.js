import apiClient from "./base";


export const getPenaltyTypes = async () => {
    try {
        const response = await apiClient.get("/penalty-types");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách loại hình phạt:", error);
        throw error;
    }
};

export const createPenaltyType = async (penaltyName) => {
    try {
        const response = await apiClient.post("/penalty-types", { penaltyName });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo loại hình phạt:", error);
        throw error;
    }
};

export const updatePenaltyType = async (penaltyId, penaltyName) => {
    try {
        const response = await apiClient.put(`/penalty-types/${penaltyId}`, { penaltyName });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật loại hình phạt:", error);
        throw error;
    }
};