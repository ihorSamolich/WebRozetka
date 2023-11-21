import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient  } from "./../../utils/Api.ts"; // Замініть шлях на свій файл з екземпляром Axios
import { Category } from "./types";

export const getCategories = createAsyncThunk<Category[]>(
    'category/getCategories',
    async () => {
        try {
            const response = await apiClient .get<Category[]>('/api/categories');
            return response.data;
        } catch (error) {
             return Promise.reject(error);
         }
    }
);

interface AddCategoryPayload {
    name: string;
    image: File | undefined | null;
    description: string;
}

export const addCategory = createAsyncThunk<Category, AddCategoryPayload>(
    'category/addCategory',
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', payload.name);
            formData.append('description', payload.description);
            formData.append('image', payload.image || '');

            const response = await apiClient .post<Category>('/api/categories', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue('Сервер недоступний. Спробуйте знову пізніше.');
        }
    }
);


// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Category } from "./types";
//
// export const getCategories = createAsyncThunk<Category[]>(
//     'category/getCategories',
//     async () => {
//         try {
//             const response = await axios.get<Category[]>('https://rozetka.itstep.click/api/categories');
//             return response.data;
//         } catch (error) {
//             return Promise.reject(error);
//         }
//     }
// );
//
// interface AddCategoryPayload {
//     name: string;
//     image: File | undefined | null;
//     description: string;
// }
//
// export const addCategory = createAsyncThunk<Category, AddCategoryPayload>(
//     'category/addCategory',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', payload.name);
//             formData.append('description', payload.description);
//             formData.append('image', payload.image || '');
//
//             const response = await axios.post<Category>('https://rozetka.itstep.click/api/categories', formData);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue('Сервер недоступний. Спробуйте знову пізніше.');
//         }
//     }
// );
