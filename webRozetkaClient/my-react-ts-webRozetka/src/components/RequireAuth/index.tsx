import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from 'hooks/reduxHooks';
import {isTokenActive} from 'utils/storage/isTokenActive.ts';

const RequireAuth : React.FC = () => {
    const isLogin = useAppSelector((state)=>state.account.isLogin);
    const location = useLocation();
    const token = localStorage.getItem('authToken');

    return (
        isLogin || isTokenActive(token)
            ? <Outlet />
            : <Navigate to="/account/login" state={{ from: location }} replace/>
    );
};

export default RequireAuth;