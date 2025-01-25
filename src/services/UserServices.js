import apiClient from './ApiClient';

export const createUser = (userData) => {
    return apiClient.post('/users', userData);
};

export const getUsers = () => {
    return apiClient.get('/users');
};

export const signInUser = (userData) => {
    return apiClient.post('/auth/login', userData);
}


