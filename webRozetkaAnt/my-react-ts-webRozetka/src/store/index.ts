import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from 'store/categories/categories.slice.ts'
import accountReducer from 'store/accounts/accounts.slice.ts'


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        account: accountReducer,
    },
})

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch