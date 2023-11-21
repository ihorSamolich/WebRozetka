import * as React from "react";
import {useState} from "react";
import {PRIMARY_BLUE_COLOR} from "./constants"
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Layout, Menu, Button, theme, ConfigProvider, Switch} from 'antd';
import CategoriesList from "views/CategoriesList";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import CategoryCreate from "views/CategoryCreate";
import NotFound from "views/NotFound";
import Home from "views/Home";
const { Header,Footer, Sider, Content } = Layout;

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
        icon: <AppstoreOutlined />,
        label: "Categories",
        children: [
            {
                key: "2",
                icon: <BuildOutlined />,
                label: (
                    <Link
                        to="/categories/all"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        All categories
                    </Link>
                ),
            },
            {
                key: "3",
                icon: <AppstoreAddOutlined />,
                label: (
                    <Link
                        to="/categories/create"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        Create category
                    </Link>
                ),
            },
        ],
    },
];
const App : React.FC = () => {
    const [themeMode, setThemeMode] = useState<boolean>(true)
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
                }}
            >
                <Layout style={{minHeight: '100vh'}}>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={items}
                        />
                    </Sider>

                    <Layout>
                        <Header style={{
                            padding: 0,
                            background: PRIMARY_BLUE_COLOR,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <Switch
                                style={{marginRight: 24}}
                                checkedChildren="Light"
                                unCheckedChildren="Dark"
                                defaultChecked
                                onChange={() => setThemeMode(!themeMode)}
                            />
                        </Header>
                        <Content
                            style={{
                                margin: '0 24px',
                                padding: '0 24px',
                                minHeight: 280,
                                maxHeight: '100%'
                            }}
                        >
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='categories/all' element={<CategoriesList/>}/>
                                <Route path='categories/create' element={<CategoryCreate/>}/>
                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
