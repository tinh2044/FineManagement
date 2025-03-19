import apiClient from "./base";


export const getLegalCasesByPrisoner = async (prisonerId) => {
    try {
        const response = await apiClient.get(`/legal-cases`, {
            params: { prisonerId },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách vụ án:", error);
        throw error;
    }
};


export const createPayment = async (caseId, paymentData) => {
    try {
        const response = await apiClient.post(`/legal-cases/${caseId}/payments`, paymentData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo thanh toán:", error);
        throw error;
    }
};

export const addJudgementToPrisoner = async (caseData) => {
    try {
        const response = await apiClient.post(`/legal-cases`, caseData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo vụ án:", error);
        throw error;
    }
};

export const updateJudgementInPrisoner = async (caseId, caseData) => {
    try {
        const response = await apiClient.put(`/legal-cases/${caseId}`, caseData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật vụ án:", error);
        throw error;
    }
};

export const addPenaltyToLegalCase = async (caseId, penaltyData) => {
    try {
        const response = await apiClient.post(`/legal-cases/${caseId}/penalties`, penaltyData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm hình phạt:", error);
        throw error;
    }
};

export const updatePenaltyInCase = async (caseId, penaltyId, penaltyData) => {
    try {
        const response = await apiClient.put(`/legal-cases/${caseId}/penalties/${penaltyId}`, penaltyData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật hình phạt:", error);
        throw error;
    }
};

export const deletePenaltyInCase = async (caseId, penaltyId) => {
    try {
        const response = await apiClient.delete(`/legal-cases/${caseId}/penalties/${penaltyId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xoá hình phạt:", error);
        throw error;
    }
};

export const updatePaymentInLegalCase = async (caseId, paymentId, paymentData) => {
    try {
        const response = await apiClient.put(`/legal-cases/${caseId}/payments/${paymentId}`, paymentData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thanh toán:", error);
        throw error;
    }
};

export const deletePaymentFromLegalCase = async (caseId, paymentId) => {
    try {
        const response = await apiClient.delete(`/legal-cases/${caseId}/payments/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xoá thanh toán:", error);
        throw error;
    }
};