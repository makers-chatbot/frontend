import apiClient from './ApiClient';

export const createProduct = (productData) => {
    return apiClient.post('/products', productData);
};

export const getProducts = () => {
    return apiClient.get('/products');
};

export const getProductsByCategory = (category) => {
    return apiClient.get(`/products?category=${category}`);
};

export const getProduct = (id) => {
    return apiClient.get(`/products/${id}`);
};

export const editProduct = (id, productData) => {
    return apiClient.patch(`/products/${id}`, productData);
};

export const deleteProduct = (id) => {
    console.log("token", sessionStorage.getItem('token'))
    console.log("id", id)
    return apiClient.delete(`/products/${id}`);
};

