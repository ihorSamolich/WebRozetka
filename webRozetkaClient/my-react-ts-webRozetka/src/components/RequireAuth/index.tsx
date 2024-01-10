import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "hooks/reduxHooks";

const RequireAuth : React.FC = () => {
    const isLogin = useAppSelector((state)=>state.account.isLogin)
    const location = useLocation();
    const token = localStorage.getItem('authToken')

    return (
        isLogin || token
            ? <Outlet />
            : <Navigate to='/account/login' state={{ from: location }} replace/>
    );
};

export default RequireAuth;