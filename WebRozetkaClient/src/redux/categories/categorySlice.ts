import { createSlice } from '@reduxjs/toolkit';
import {Category, Status} from './types';
import {addCategory, getCategories} from "./asyncActions.ts";

interface CategoryState {
    items: Category[],
    status: Status;
}

const initialState: CategoryState = {
    items: [],
    status: Status.LOADING,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(getCategories.rejected, (state) => {
                state.status = Status.ERROR;
            })
            .addCase(addCategory.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items.push(action.payload)
            })
    },
});

export default categorySlice.reducer;