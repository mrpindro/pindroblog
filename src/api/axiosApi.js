import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'https://pindroblog-api.onrender.com',
    // baseURL: 'http://localhost:5500',
})