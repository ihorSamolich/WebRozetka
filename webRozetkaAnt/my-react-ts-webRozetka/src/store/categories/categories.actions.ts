import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiClient} from "utils/api.ts";
import {ICategoryCreate, ICategoryItem} from "interfaces/categories";
export const getCategories = createAsyncThunk<ICategoryItem[]>(
    'category/getCategories',
    async () => {
        const response = await apiClient.get<ICategoryItem[]>('/api/categories');
        return response.data;
    }
);

export const addCategory = createAsyncThunk<ICategoryItem, ICategoryCreate, { rejectValue: string }>(
    'category/addCategory',
    async (payload: ICategoryCreate, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', payload.name);
            formData.append('description', payload.description);
            formData.append('image', payload.image || '');
            const response = await apiClient.post<ICategoryItem>('/api/categories', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue('Сервер недоступний. Спробуйте знову пізніше.');
        }
    }
);