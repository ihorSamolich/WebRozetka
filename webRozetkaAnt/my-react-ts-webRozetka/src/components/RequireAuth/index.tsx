import React from 'react';
import {useAppSelector} from "hooks/reduxHooks";
import {Navigate, Outlet} from "react-router-dom";

const RequireAuth : React.FC = () => {
    const isLogin : boolean = useAppSelector(state => state.account.isLogin)

    return (
        isLogin
            ? <Outlet/>
            : <Navigate to='/account/login'/>
    );
};

export default RequireAuth;