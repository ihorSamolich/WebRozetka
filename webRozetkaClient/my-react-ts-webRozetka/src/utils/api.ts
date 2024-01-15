import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {APP_ENV} from 'env';
import {isTokenActive} from 'utils/isTokenActive.ts';

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
} as IApiClientConfig);

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenActive(token)) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});