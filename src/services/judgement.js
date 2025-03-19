import apiClient from './base';


export const getJudgements = async (page = 1, limit = 10) => {
    try {
        console.log(import.meta.env.VITE_API_URL);
        const response = await apiClient.get("/judgements", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

export const createJudgement = async (data) => {
    try {
        console.log(data);
        const response = await apiClient.post("/judgements", data, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo bản án:", error);
        throw error;
    }
};

export const updateJudgement = async (judgementId, data) => {
    try {
        const response = await apiClient.put(`/judgements/${judgementId}`, data, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật bản án:", error);
        throw error;
    }
};

export default apiClient;