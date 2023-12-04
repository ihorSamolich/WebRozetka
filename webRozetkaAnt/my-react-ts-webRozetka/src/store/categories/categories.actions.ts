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

export const getCategoryById = createAsyncThunk(
    'category/getCategoryById',
    async (categoryId: number) => {
        const response = await apiClient.get<ICategoryItem>(`/api/categories/${categoryId}`);
        return response.data;
    }
);

export const addCategory = createAsyncThunk<ICategoryItem, ICategoryCreate, { rejectValue: string }>(
    'category/addCategory',
    async (payload: ICategoryCreate, { rejectWithValue }) => {
        try {
            const response =
                await apiClient.post<ICategoryItem>("/api/categories", payload,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
            return response.data;
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/api/categories/${categoryId}`);
            return categoryId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk<void, ICategoryItem, { rejectValue: string }>(
    'category/updateCategory',
    async (payload: ICategoryItem, { rejectWithValue }) => {
        try {
                await apiClient.put<ICategoryItem>("/api/categories", payload,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
            return;
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
    }
);

