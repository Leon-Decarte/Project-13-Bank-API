import axios from 'axios';

const API = axios.create({
    baseURL: "/api", // Utilise le proxy configuré dans vite.config.js
});

// Intercepteur pour injecter automatiquement le token
API.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default {
    login: (email, password) => API.post("/v1/user/login", { email, password }),
    getProfile: () => API.post("/v1/user/profile"),
    updateProfile: (firstName, lastName) =>
        API.put("/v1/user/profile", { firstName, lastName })
};