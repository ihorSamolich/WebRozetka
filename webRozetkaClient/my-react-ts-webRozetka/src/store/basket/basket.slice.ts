import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasketItem, IBasketState } from 'interfaces/basket';
import {calcTotalPrice} from 'utils/basket/calcTotalPrice.ts';
import {addLocalStorage, deleteLocalStorage, getLocalStorage} from 'utils/basket/localStorageBasket.ts';

const initialState: IBasketState = getLocalStorage('basket');

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<IBasketItem>) => {
            const newItem = action.payload;
            const findItemIndex = state.items.findIndex((obj) => obj.product.id === newItem.product.id);

            if (findItemIndex === -1) {
                state.items.push({ ...newItem, count: 1 });
            } else {
                state.items[findItemIndex].count++;
            }
            state.allPriceProducts = calcTotalPrice(state.items);

            addLocalStorage('basket', state);
        },

        changeBasketCount: (state, action: PayloadAction<{ productId: number, newCount: number }>) => {
            const { productId, newCount } = action.payload;
            const foundItem = state.items.find((item) => item.product.id === productId);

            if (foundItem) {
                foundItem.count = newCount;
                state.allPriceProducts = calcTotalPrice(state.items);

                addLocalStorage('basket', state);
            }
        },

        removeFromBasket: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;
            state.items = state.items.filter(item => item.product.id !== productIdToRemove);

            state.allPriceProducts = calcTotalPrice(state.items);

            addLocalStorage('basket', state);
        },

        clearBasket(state) {
            state.items = [];
            state.allPriceProducts = 0;

            deleteLocalStorage('basket');
        },
    },
});


export const { clearBasket, addToBasket, removeFromBasket,changeBasketCount } = basketSlice.actions;
export default basketSlice.reducer;
