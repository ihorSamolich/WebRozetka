import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryState} from "interfaces/categories";
import {Status} from "constants/enums";
import {
    addCategory,
    deleteCategory,
    getCategories, getCategoriesAll,
    getCategoryById,
    updateCategory
} from "store/categories/categories.actions.ts";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>

const initialState: ICategoryState = {
    items: [],
    totalItems: 0,
    error: null,
    status: Status.IDLE,
};

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected')
}

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalItems = action.payload.count;
                state.status = Status.SUCCESS;
            })
            .addCase(getCategoriesAll.fulfilled, (state, action) =>{
                state.items = action.payload
                state.status = Status.SUCCESS;
            })
            .addCase(getCategoryById.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addMatcher(isPendingAction, (state) => {
                state.items = [];
                state.totalItems = 0;
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state,action) => {
                state.status = Status.ERROR;
                state.error = action.payload;
            })
    },
});

export default categorySlice.reducer;