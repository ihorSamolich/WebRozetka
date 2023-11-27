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