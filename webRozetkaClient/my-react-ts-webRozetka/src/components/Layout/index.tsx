import React, { useState} from 'react';
import {Layout, theme, ConfigProvider, Menu, MenuProps} from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {TopHeader} from 'components';
import Sider from 'antd/es/layout/Sider';
import {AppstoreAddOutlined, AppstoreOutlined, BuildOutlined, HomeOutlined} from '@ant-design/icons';
import Basket from 'components/Basket';

const items: MenuProps['items'] = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: (
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
            </NavLink>
        ),
    },
    {
        key: '/categories/',
        icon: <AppstoreOutlined/>,
        label: 'Categories',
        children: [
            {
                key: '/categories',
                icon: <BuildOutlined/>,
                label: (
                    <NavLink
                        to="/categories"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        All categories
                    </NavLink>
                ),
            },
            {
                key: '/categories/create',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="/categories/create"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        Create category
                    </NavLink>
                ),
            },
        ],
    },
    {
        key: '/products',
        icon: <AppstoreOutlined/>,
        label: 'Products',
        children: [
            {
                key: '/product/create',
                icon: <AppstoreAddOutlined/>,
                label: (
                    <NavLink
                        to="/product/create"
                        style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        Create product
                    </NavLink>
                ),
            },
        ],
    },
];


const SiteLayout : React.FC = () => {
    const {Footer, Content } = Layout;
    const [themeMode, setThemeMode] = useState<boolean>(true);
    const location = useLocation();
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <ConfigProvider theme={{algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
            <Layout style={{minHeight: '100vh'}}>
                <Basket/>
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
                            maxHeight: '100%',
                        }}
                    >
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default SiteLayout;

