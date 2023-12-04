import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryState} from "interfaces/categories";
import {Status} from "interfaces/enums";
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
    selectedItem: null,
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
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(getCategories.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.selectedItem = action.payload;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items.push(action.payload)
            })
            .addCase(addCategory.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(updateCategory.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            })
    },
});

export default categorySlice.reducer;