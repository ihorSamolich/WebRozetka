import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {APP_ENV} from "env";

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
} as IApiClientConfig);

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});