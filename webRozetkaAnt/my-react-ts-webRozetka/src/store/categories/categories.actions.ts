import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiClient} from "utils/api.ts";
import {ICategoryCreate, ICategoryItem, ICategoryUpdate} from "interfaces/categories";



export const getCategories = createAsyncThunk<ICategoryItem[]>(
    'category/getCategories',
    async () => {
        const response = await apiClient.get<ICategoryItem[]>('/api/categories');
        return response.data;
    }
);

export const getCategoryById = createAsyncThunk<ICategoryItem, number>(
    'category/getCategoryById',
    async (categoryId) => {
        const {data } = await apiClient.get<ICategoryItem>(`/api/categories/${categoryId}`);
        return data;
    }
);

export const deleteCategory = createAsyncThunk<number,number>(
    'category/deleteCategory',
    async (categoryId) => {
        await apiClient.delete(`/api/categories/${categoryId}`);
        return categoryId;
    }
);

export const addCategory = createAsyncThunk<ICategoryItem, ICategoryCreate>(
    'category/addCategory',
    async (payload: ICategoryCreate, { rejectWithValue }) => {
        try {
            const {data} = await apiClient.post<ICategoryItem>("/api/categories", payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const updateCategory = createAsyncThunk<ICategoryItem, ICategoryUpdate, { rejectValue: string }>(
    'category/updateCategory',
    async (payload: ICategoryUpdate, { rejectWithValue }) => {
        try {
            const {data} = await apiClient.put<ICategoryItem>("/api/categories", payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

