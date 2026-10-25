import axios from "axios";

// const api = axios.create({
//     // baseURL: "https://localhost:7096/api"
//     baseURL: "https://enterprosehelpdesk-api-drc0e7a7bdbpc9cu.eastasia-01.azurewebsites.net/api"
// });
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;