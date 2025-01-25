import apiClient from "./ApiClient";

export const createContract = (contractData) => {
    return apiClient.post('/contracts', contractData);
}

export const getContracts = () => {
    return apiClient.get('/contracts');
}

export const getContract = (id) => {
    return apiClient.get(`/contracts/${id}`);
}

export const deleteContract = (id) => {
    return apiClient.delete(`/contracts/${id}`);
}

export const updateContract = (id, contractData) => {
    return apiClient.patch(`/contracts/${id}`, contractData);
}
