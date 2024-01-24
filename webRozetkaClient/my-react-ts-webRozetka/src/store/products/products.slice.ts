import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Status} from 'utils/enums';
import {IProductState} from 'interfaces/product';
import {addProduct, getProductById, getProducts, getProductsByCategory} from 'store/products/products.actions.ts';

// eslint-disable-next-line
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

const initialState: IProductState = {
    items: [],
    totalItems: 0,
    selectedItem: null,
    error: null,
    status: Status.IDLE,
};
function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getProducts.pending, (state) => {
                state.items = [];
                state.selectedItem = null;
                state.status = Status.LOADING;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.items = [];
                state.selectedItem = null;
                state.status = Status.LOADING;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.selectedItem = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.items = [];
                state.selectedItem = null;
                state.status = Status.LOADING;
            })
            .addCase(addProduct.pending, (state) => {
                state.items = [];
                state.selectedItem = null;
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state,action) => {
                state.status = Status.ERROR;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;