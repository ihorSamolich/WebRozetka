import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import {isTokenActive} from 'utils/storage/isTokenActive.ts';
import {getLocalStorage} from 'utils/storage/localStorageUtils.ts';

const RequireAuth : React.FC = () => {
    const isLogin = useAppSelector((state)=>state.account.isLogin);
    const location = useLocation();
    const token = getLocalStorage('authToken');

    return (
        isLogin || isTokenActive(token as string)
            ? <Outlet />
            : <Navigate to="/account/login" state={{ from: location }} replace/>
    );
};

export default RequireAuth;