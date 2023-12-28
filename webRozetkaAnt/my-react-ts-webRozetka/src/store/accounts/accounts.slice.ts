import {AnyAction, AsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { login } from "store/accounts/accounts.actions.ts";
import { IAccountState, IUser } from "interfaces/account";
import { jwtDecode } from "jwt-decode";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected')
}

const updateUserState = (state: IAccountState, token: string): void => {
    const { name, email, image } = jwtDecode<IUser>(token);
    state.user = {
        name,
        email,
        image,
    };
    state.token = token;
    state.isLogin = true;

    localStorage.setItem('authToken', token);
};

const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        logout: (state) => {
            localStorage.removeItem('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const { token } = action.payload;

            updateUserState(state, token);
        })
        .addMatcher(isRejectedAction, () => {
            console.log('Error auth!')
        });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;
