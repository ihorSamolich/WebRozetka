import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiClient} from "utils/api.ts";
import {
    ICategoriesData,
    ICategoriesPageParams,
    ICategoryCreate,
    ICategoryItem,
    ICategoryUpdate
} from "interfaces/categories";
import {handleAxiosError} from "utils/handleAxiosError.ts";

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (payload : ICategoriesPageParams,{rejectWithValue}) => {
        try {
            const {page, pageSize, search} = payload;

            const response
                = await apiClient.get<ICategoriesData>(`/api/categories?page=${page}&pageSize=${pageSize}${search ? `&search=${search}`:``}`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);

export const getCategoryById = createAsyncThunk<ICategoryItem, number>(
    'category/getCategoryById',
    async (categoryId, {rejectWithValue}) => {
        try {
            const {data} = await apiClient.get<ICategoryItem>(`/api/categories/${categoryId}`);
            return data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);

export const deleteCategory = createAsyncThunk<number,number>(
    'category/deleteCategory',
    async (categoryId, {rejectWithValue}) => {
        try {
            await apiClient.delete(`/api/categories/${categoryId}`);
            return categoryId;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
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
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
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
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);

