import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryState} from "interfaces/categories";
import {Status} from "constants/enums";
import {
    addCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from "store/categories/categories.actions.ts";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

const initialState: ICategoryState = {
    items: [],
    totalItems: 0,
    error: null,
    status: Status.IDLE,
};
function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected')
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                const {items, count} = action.payload;

                state.items = items;
                state.totalItems = count;

                state.status = Status.SUCCESS;
            })
            .addCase(getCategories.pending, (state) => {
                state.items = [];
                state.status = Status.LOADING;
            })
            .addCase(getCategoryById.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(addCategory.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const id = action.payload.id

                state.items = [...state.items.filter(item => item.id !== id), action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(updateCategory.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state,action) => {
                state.status = Status.ERROR;
                state.error = action.payload;
            })
    },
});

export default categorySlice.reducer;