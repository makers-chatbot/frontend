import axios from 'axios';

// Función para obtener el token (puedes ajustarla según cómo almacenes el token)
function getToken() {
    // Supongamos que el token está almacenado en sessionStorage
    return sessionStorage.getItem('token');
}

// Crear la instancia de axios
const apiClient = axios.create({
    baseURL: "http://localhost:8081/api",// Reemplaza con tu URL base
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Añadir un interceptor para incluir el Bearer token en el header de cada solicitud
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
