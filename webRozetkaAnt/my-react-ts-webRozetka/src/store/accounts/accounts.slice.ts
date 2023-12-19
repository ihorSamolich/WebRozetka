import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "store/accounts/accounts.actions.ts";
import {IAccountState, IUser} from "interfaces/account";
import {jwtDecode} from "jwt-decode";

const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        autoLogin: (state, action) => {
            const { name, email } = jwtDecode<IUser>(action.payload);
            state.user = {
                name,
                email,
            };
            state.token = action.payload;
            state.isLogin = true;
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

            localStorage.setItem('authToken', token);

            const { name, email } = jwtDecode<IUser>(token);

            state.user = {
                name,
                email,
            };
            state.token = action.payload;
            state.isLogin = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {

        });
    },
});


export const { autoLogin,logout } = accountsSlice.actions;
export default accountsSlice.reducer;