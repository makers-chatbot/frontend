import apiClient from "./ApiClient";


export const createCompany = (companyData) => {
    return apiClient.post('/companies', companyData);
};

export const getCompanies = () => {
    return apiClient.get('/companies');
};

