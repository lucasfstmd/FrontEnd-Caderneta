import axios from 'axios'
import {getToken} from "./auth/auth";

const api = axios.create({
    baseURL: process.env.BACK_END_PORT || 'https://back-cr.herokuapp.com/api/'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
