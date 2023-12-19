import React, {useEffect, useState} from "react";
import {Layout, theme, ConfigProvider, Menu, MenuProps} from 'antd';
import {useNavigate, Route, Routes, Link} from "react-router-dom";
import {Home, NotFound, CategoriesList, CategoryEdit, CategoryCreate, Registration} from "views"
import {TopHeader, RequireAuth} from "components";
import Login from "views/Login";
import {useAppDispatch} from "hooks/reduxHooks";
import {autoLogin} from "store/accounts/accounts.slice.ts";
import Sider from "antd/es/layout/Sider";
import {AppstoreAddOutlined, AppstoreOutlined, BuildOutlined, HomeOutlined} from "@ant-design/icons";

const items: MenuProps["items"] = [
    {
        key: "1",
        icon: <HomeOutlined />,
        label: (
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
            </Link>
        ),
    },
    {
        key: "sub1",
        icon: <AppstoreOutlined/>,
        label: "Categories",
        children: [
            {
                key: "2",
                icon: <BuildOutlined/>,
                label: (
                    <Link
                        to="/categories/all"
                        style={{color: "inherit", textDecoration: "none"}}
                    >
                        All categories
                    </Link>
                ),
            },
            {
                key: "3",
                icon: <AppstoreAddOutlined/>,
                label: (
                    <Link
                        to="/categories/create"
                        style={{color: "inherit", textDecoration: "none"}}
                    >
                        Create category
                    </Link>
                ),
            },
        ],
    }
];


const App : React.FC = () => {
    const {Footer, Content } = Layout;
    const [themeMode, setThemeMode] = useState<boolean>(true)
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token){
            dispatch(autoLogin(token))
            navigate('/')
        }
    }, []);

    return (
        <ConfigProvider theme={{algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
            <Layout style={{minHeight: '100vh'}}>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        style={{position: 'sticky', top: 0}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </Sider>

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

                            <Route element={<RequireAuth/>}>
                                <Route path='/categories/'>
                                    <Route path='all' element={<CategoriesList />} />
                                    <Route path='create' element={<CategoryCreate />} />
                                    <Route path='edit/:id' element={<CategoryEdit />} />
                                </Route>
                            </Route>

                            <Route path='/account/'>
                                <Route path='login' element={<Login/>} />
                                <Route path='register' element={<Registration/>} />
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

