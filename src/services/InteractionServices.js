import apiClient from "./ApiClient";

export const getInteractions = (companyId, departmentId) => {
    return apiClient.get(
        `/interactions?companyId=${companyId}&departmentId=${departmentId}`
    );
};

export const postInteraction = (interaction) => {
    return apiClient.post("/interactions", interaction);
}