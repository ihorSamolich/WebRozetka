import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration, ProductDetail} from 'views';
import {RequireAuth} from 'components';
import Login from 'views/Login';
import SiteLayout from 'components/Layout';
import ProductsList from 'views/ProductsList';
import ProductCreate from 'views/ProductCreate';
import {autoLogin} from 'store/accounts/accounts.slice.ts';
import {useAppDispatch} from 'hooks/reduxHooks';
import {useLocalStorageHook} from 'hooks/useLocalStorageHook';

const App : React.FC = () => {
    const dispatch = useAppDispatch();
    const [token] = useLocalStorageHook('authToken');

    useEffect(() => {
        if (token){
            dispatch(autoLogin(token));
        }
    }, [dispatch, token]);

    return (
        <Routes>
            <Route
                path="/"
                element={<SiteLayout />}
            >

                <Route index element={<Home />} />

                <Route
                    element={<RequireAuth />}
                >
                    <Route path="categories/" >
                        <Route index element={<CategoriesList />} />
                        <Route path="?page=:pageNumber" element={<CategoriesList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="products-category/:categoryId" element={<ProductsList/>} />
                    </Route>

                    <Route path="product/" >
                        <Route path=":productId" element={<ProductDetail/>} />
                        <Route path="create" element={<ProductCreate/>} />
                    </Route>
                </Route>

                <Route path="account/">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Registration />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;

