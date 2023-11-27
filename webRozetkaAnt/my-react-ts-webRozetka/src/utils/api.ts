import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {APP_ENV} from "../env";

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
} as IApiClientConfig);