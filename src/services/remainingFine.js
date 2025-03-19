import apiClient from "./base";

export const getRemainingFines = async (page = 1, limit = 100, prisonerName = null, dob = null, pob = null) => {
    try {
        console.log("Fetching remaining fines with params:", { page, limit, prisonerName, dob, pob });
        const response = await apiClient.get("/remaining-fines", {
            params: { page, limit, prisonerName, dob, pob },
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tiền phạt còn lại:", error);
        throw error;
    }
};
