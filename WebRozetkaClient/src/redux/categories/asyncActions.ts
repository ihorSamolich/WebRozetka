import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "./types";

export const getCategories = createAsyncThunk<Category[]>(
    'category/getCategories',
    async () => {
        try {
            const response = await axios.get<Category[]>('http://localhost:5135/api/categories');
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

            const response = await axios.post<Category>('http://localhost:5135/api/categories', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue('Сервер недоступний. Спробуйте знову пізніше.');
        }
    }
);
