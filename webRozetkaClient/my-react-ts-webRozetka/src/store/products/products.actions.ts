import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "utils/api.ts";
import {handleAxiosError} from "utils/handleAxiosError.ts";
import {IProductItem} from "interfaces/product";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.get<IProductItem[]>(`/api/products`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);

export const getProductsByCategory = createAsyncThunk<IProductItem[], number>(
    'product/getProductsByCategory',
    async (categoryId,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.get<IProductItem[]>(`/api/products/category/${categoryId}`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);

export const getProductById = createAsyncThunk<IProductItem, number>(
    'product/getProductById',
    async (productId,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.get<IProductItem>(`/api/products/${productId}`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    }
);