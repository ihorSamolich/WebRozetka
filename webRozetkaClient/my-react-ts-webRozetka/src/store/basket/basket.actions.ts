import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from 'utils/api/apiClient.ts';
import {handleAxiosError} from 'utils/errors/handleAxiosError.ts';
import {IOrderData} from 'interfaces/order';


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