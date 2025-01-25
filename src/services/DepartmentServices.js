// src/services/departmentService.js
import apiClient from './ApiClient';

export const createDepartment = (departmentData) => {
    return apiClient.post('/departments', departmentData);
};

export const getDepartments = () => {
    return apiClient.get('/departments');
};

// Puedes agregar más funciones según sea necesario
