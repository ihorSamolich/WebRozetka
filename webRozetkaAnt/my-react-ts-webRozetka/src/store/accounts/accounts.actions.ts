import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "utils/api.ts";
import {ILogin, IRegistration} from "interfaces/account";

export const login = createAsyncThunk(
    'account/login',
    async (payload : ILogin, { rejectWithValue }) => {

        try {
            const response = await apiClient.post('/api/account', payload);
            return response.data;
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }

    }
);

export const register = createAsyncThunk(
    'account/register',
    async (payload : IRegistration, { rejectWithValue }) => {
        try {
            console.log(payload)
            const response = await apiClient.post('/api/account/register', payload);
            return response.data;
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }

    }
);