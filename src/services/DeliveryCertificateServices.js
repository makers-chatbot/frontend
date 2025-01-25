import apiClient from "./ApiClient";

export const createDeliveryCertificate = (deliveryCertificateData) => {
    return apiClient.post("/deliveryCertificates", deliveryCertificateData);
}

export const getDeliveryCertificates = () => {
    return apiClient.get("/deliveryCertificates");
}

export const getDeliveryCertificate = (id) => {
    return apiClient.get(`/deliveryCertificates/${id}`);
}

export const deleteDeliveryCertificate = (id) => {
    return apiClient.delete(`/deliveryCertificates/${id}`);
}

export const updateDeliveryCertificate = (id, deliveryCertificateData) => {
    return apiClient.patch(`/deliveryCertificates/${id}`, deliveryCertificateData);
}

