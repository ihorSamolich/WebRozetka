import React, {useEffect, useState} from "react";
import {Layout, theme, ConfigProvider, Menu, MenuProps} from 'antd';
import { Link, Outlet} from "react-router-dom";
import {TopHeader} from "components";
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


const SiteLayout : React.FC = () => {
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
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default SiteLayout;

