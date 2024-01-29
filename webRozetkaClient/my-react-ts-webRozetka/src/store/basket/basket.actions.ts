import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from 'utils/api/apiClient.ts';
import {handleAxiosError} from 'utils/errors/handleAxiosError.ts';
import {IOrderData} from 'interfaces/order';
import {IAddBasketProduct} from 'interfaces/basket';


export const createOrder = createAsyncThunk(
    'basket/createOrder',
    async (payload: IOrderData, {rejectWithValue}) => {
        try {
            const response
                = await apiClient.post('/api/order',payload);

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (payload : IAddBasketProduct, {rejectWithValue}) => {
        try {
            const response
                = await apiClient.post('/api/order/add-to-basket', {productId: payload.productId, count: payload.count});

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const clearBasket = createAsyncThunk(
    'basket/clearBasket',
    async (_, {rejectWithValue}) => {
        try {
            const response
                = await apiClient.delete('/api/order/clear-basket');

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async (payload : number, {rejectWithValue}) => {
        try {
            const response
                = await apiClient.delete(`/api/order/remove-from-basket/${payload}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);