import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {API_URL} from "constants/index.ts";

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
} as IApiClientConfig);