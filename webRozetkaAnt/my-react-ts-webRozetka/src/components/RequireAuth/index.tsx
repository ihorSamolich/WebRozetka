import React from 'react';
import {useAppSelector} from "hooks/reduxHooks";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth : React.FC = () => {
    const isLogin : boolean = useAppSelector(state => state.account.isLogin)
    const location = useLocation()

    return (
        isLogin
            ? <Outlet/>
            : <Navigate to='/account/login' state={{ from: location }} replace/>
    );
};

export default RequireAuth;