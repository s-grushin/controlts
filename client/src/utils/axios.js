import axios from "axios";
import { STORAGE_KEYS } from '../constants/appConstants'

const instance = axios.create({
    baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem(STORAGE_KEYS.authToken);
    return config;
});

export default instance;
