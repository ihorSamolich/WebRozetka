import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login, ProductCreate, ProductsList, Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration, ProductDetail,CreateOrder} from 'views';
import { RequireAuth, Layout as SiteLayout} from 'components';
import {autoLogin} from 'store/accounts/accounts.slice.ts';
import {useAppDispatch} from 'hooks/redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {isTokenActive} from 'utils/storage/isTokenActive.ts';
import {getLocalStorage} from 'utils/storage/localStorageUtils.ts';

const queryClient = new QueryClient();

const App : React.FC = () => {
    const dispatch = useAppDispatch();
    const token = getLocalStorage('authToken');

    useEffect(() => {
        if (typeof token === 'string') {
            if (isTokenActive(token)) {
                dispatch(autoLogin(token));
            }
        }
    }, [dispatch, token]);

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route
                    path="/"
                    element={<SiteLayout/>}
                >

                    <Route index element={<Home/>}/>

                    <Route
                        element={<RequireAuth/>}
                    >
                        <Route path="categories/">
                            <Route index element={<CategoriesList/>}/>
                            <Route path="?page=:pageNumber" element={<CategoriesList/>}/>
                            <Route path="create" element={<CategoryCreate/>}/>
                            <Route path="edit/:id" element={<CategoryEdit/>}/>
                            <Route path=":categoryId/products" element={<ProductsList/>}/>
                        </Route>

                        <Route path="product/">
                            <Route path=":productId" element={<ProductDetail/>}/>
                            <Route path="create" element={<ProductCreate/>}/>
                        </Route>

                        <Route path="checkout/">
                            <Route path="order" element={<CreateOrder/>}/>
                        </Route>
                    </Route>

                    <Route path="account/">
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Registration/>}/>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default App;

