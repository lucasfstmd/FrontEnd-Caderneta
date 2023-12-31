import axios from 'axios'
import {getToken} from "./auth/auth";

const api = axios.create({
    baseURL: 'https://proeva-caderneta.ccs.ufrn.br:8080/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
