import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IBasketProduct, IBasketState} from 'interfaces/basket';
import {calcTotalPrice} from 'utils/basket/calcTotalPrice.ts';
import {addLocalStorage, deleteLocalStorage, getLocalStorage} from 'utils/storage/localStorageUtils.ts';
import {addToBasket, clearBasket, removeFromBasket} from 'store/basket/basket.actions.ts';

const initialState: IBasketState = getLocalStorage('basket') as IBasketState || { items: [], allPriceProducts: 0 };

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(addToBasket.fulfilled, (state, action: PayloadAction<IBasketProduct>) => {
                const existingProductIndex = state.items.findIndex(item => item.productId === action.payload.productId);

                if (existingProductIndex !== -1) {
                    state.items[existingProductIndex].count = action.payload.count;
                } else {
                    state.items.push(action.payload);
                }

                state.allPriceProducts = calcTotalPrice(state.items);
                addLocalStorage('basket', state);
            })

            .addCase(clearBasket.fulfilled, (state) => {
                state.items = [];
                state.allPriceProducts = 0;
                deleteLocalStorage('basket');
            })
            .addCase(removeFromBasket.fulfilled, (state, action: PayloadAction<number>) => {
                const productIdToRemove = action.payload;
                state.items = state.items.filter(item => item.productId !== productIdToRemove);
                state.allPriceProducts = calcTotalPrice(state.items);
                addLocalStorage('basket', state);
            });
        // .addCase(changeCountToBasket.fulfilled, (state,action) => {
        //     state.items = action.payload?.value;
        //     state.allPriceProducts = calcTotalPrice(state.items);
        //     addLocalStorage('basket', state);
        // });
    },
});

export default basketSlice.reducer;
