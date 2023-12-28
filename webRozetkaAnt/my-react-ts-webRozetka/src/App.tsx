import React from "react";
import { Route, Routes} from "react-router-dom";
import {Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration} from "views"
import { RequireAuth} from "components";
import Login from "views/Login";
import SiteLayout from "components/Layout";


const App : React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<SiteLayout />}
            >
                <Route index element={<Home />} />

                <Route
                    path="/categories/"
                    element={<RequireAuth />}
                >
                    <Route path="all" element={<CategoriesList />} />
                    <Route path="all/page/:pageNumber" element={<CategoriesList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
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

