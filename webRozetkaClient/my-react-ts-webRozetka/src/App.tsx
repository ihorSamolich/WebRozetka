import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration, ProductDetail} from "views"
import {RequireAuth} from "components";
import Login from "views/Login";
import SiteLayout from "components/Layout";
import ProductsList from "views/ProductsList";

const App : React.FC = () => {
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
                    <Route path="categories/">
                        <Route path="all" element={<CategoriesList />} />
                        <Route path="all/page/:pageNumber" element={<CategoriesList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="products-category/:categoryId" element={<ProductsList/>} />
                    </Route>
                    <Route path="product/:productId" element={<ProductDetail/>} />
                </Route>

                <Route path="/account/">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Registration />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;

