import React, {useEffect, useState} from "react";
import { Layout, theme, ConfigProvider} from 'antd';
import { Route, Routes} from "react-router-dom";
import {Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration} from "views"
import {TopHeader, SideMenu, RequireAuth} from "components";
import Login from "views/Login";
import {useAppDispatch} from "hooks/reduxHooks";
import {autoLogin} from "store/accounts/accounts.slice.ts";


const App : React.FC = () => {
    const {Footer, Content } = Layout;
    const [themeMode, setThemeMode] = useState<boolean>(true)
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token){
            dispatch(autoLogin(token))
        }
    }, []);

    return (
        <ConfigProvider theme={{algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
            <Layout style={{minHeight: '100vh'}}>
                <SideMenu collapsed={collapsed}/>
                <Layout>
                    <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} themeMode={themeMode} setThemeMode={setThemeMode} />
                    <Content
                        style={{
                            margin: '0 24px',
                            padding: '0 24px',
                            minHeight: 280,
                            maxHeight: '100%'
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<Home />} />

                            <Route path='/account/'>
                                <Route path='login' element={<Login/>} />
                                <Route path='register' element={<Registration/>} />
                            </Route>

                            <Route element={<RequireAuth/>}>
                                <Route path='/categories/'>
                                    <Route path='all' element={<CategoriesList />} />
                                    <Route path='create' element={<CategoryCreate />} />
                                    <Route path='edit/:id' element={<CategoryEdit />} />
                                </Route>
                            </Route>

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
