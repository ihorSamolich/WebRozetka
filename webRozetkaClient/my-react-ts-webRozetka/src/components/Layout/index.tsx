import React, {useEffect, useState} from "react";
import {Layout, theme, ConfigProvider, Menu, MenuProps} from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {TopHeader} from "components";
import {useAppDispatch} from "hooks/reduxHooks";
import {autoLogin} from "store/accounts/accounts.slice.ts";
import Sider from "antd/es/layout/Sider";
import {AppstoreAddOutlined, AppstoreOutlined, BuildOutlined, HomeOutlined} from "@ant-design/icons";
import {useLocalStorageHook} from "hooks/useLocalStorageHook";

const items: MenuProps["items"] = [
    {
        key: "/",
        icon: <HomeOutlined />,
        label: (
            <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
            </NavLink>
        ),
    },
    {
        key: "/categories",
        icon: <AppstoreOutlined/>,
        label: "Categories",
        children: [
            {
                key: "/categories/all",
                icon: <BuildOutlined/>,
                label: (
                    <NavLink
                        to="/categories/all"
                        style={{color: "inherit", textDecoration: "none"}}
                    >
                        All categories
                    </NavLink>
                ),
            },
            {
                key: "/categories/create",
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="/categories/create"
                        style={{color: "inherit", textDecoration: "none"}}
                    >
                        Create category
                    </NavLink>
                ),
            },
        ],
    }
];


const SiteLayout : React.FC = () => {
    const {Footer, Content } = Layout;
    const [themeMode, setThemeMode] = useState<boolean>(true)
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const location = useLocation();
    const [token, setToken] = useLocalStorageHook('authToken')

    useEffect(() => {
        if (token){
            dispatch(autoLogin(token))
        }
    }, []);

    return (
        <ConfigProvider theme={{algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
            <Layout style={{minHeight: '100vh'}}>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        selectedKeys={[location.pathname]}
                        style={{position: 'sticky', top: 0}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/']}
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
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default SiteLayout;

