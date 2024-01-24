import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryState} from 'interfaces/categories';
import {Status} from 'utils/enums';
import {
    addCategory,
    deleteCategory,
    getCategories,
    getCategoriesNames,
    getCategoryById,
    updateCategory,
} from 'store/categories/categories.actions.ts';

// eslint-disable-next-line
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

const initialState: ICategoryState = {
    items: [],
    itemNames: [],
    totalItems: 0,
    error: null,
    status: Status.IDLE,
};

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
            .addCase(getCategoriesNames.fulfilled, (state, action) =>{
                state.itemNames = action.payload;
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
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state,action) => {

                console.log('in add matcher');

                state.status = Status.ERROR;
                state.error = action.payload;
                state.totalItems = 0;
                state.items=[];
                state.itemNames=[];
            });
    },
});

export default categorySlice.reducer;