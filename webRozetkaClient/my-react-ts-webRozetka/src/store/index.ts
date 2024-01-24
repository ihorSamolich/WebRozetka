import { configureStore } from '@reduxjs/toolkit';
import accountReducer from 'store/accounts/accounts.slice.ts';
import productReducer from 'store/products/products.slice.ts';
import basketReducer from  'store/basket/basket.slice.ts';

export const store = configureStore({
    reducer: {
        //category: categoryReducer,
        account: accountReducer,
        product: productReducer,
        basket: basketReducer,
    },
});

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;