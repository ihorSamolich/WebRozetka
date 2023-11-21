import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryState} from "interfaces/categories";
import {Status} from "interfaces/enums";
import {addCategory, getCategories} from "store/categories/categories.actions.ts";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>


const initialState: ICategoryState = {
    items: [],
    status: Status.LOADING,
};
function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending')
}
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
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items.push(action.payload)
            })
            .addMatcher(isPendingAction, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            })
    },
});

export default categorySlice.reducer;