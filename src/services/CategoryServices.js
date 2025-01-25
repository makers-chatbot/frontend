import apiClient from './ApiClient';

export const createCategory = (categoryData) => {
    return apiClient.post('/categories', categoryData);
};

export const getCategories = () => {
    return apiClient.get('/categories');
};

export const deleteCategory = (id) => {
    return apiClient.delete(`/categories/${id}`);
};

