import {Menu, MenuProps} from "antd";
import {Link} from "react-router-dom";
import {
    AppstoreOutlined,
    HomeOutlined,
    AppstoreAddOutlined,
    BuildOutlined,
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import {ISideMenu} from "interfaces/design";
import React from "react";

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

const SideMenu : React.FC<ISideMenu> = (props) => {
    const {collapsed} = props;

    return (
        <Sider style={{position: "sticky", width: '100%'}} trigger={null} collapsible collapsed={collapsed}>
            <Menu
                style={{position: 'sticky', top: 0}}
                theme="dark"
                mode="inline"
                items={items}
            />
        </Sider>
    );
}

export default SideMenu;