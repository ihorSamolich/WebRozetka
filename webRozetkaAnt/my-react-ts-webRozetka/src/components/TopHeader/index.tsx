import React from 'react';
import {PRIMARY_BLUE_COLOR} from "constants/index.ts";
import {Button, Switch} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {ITopHeader} from "interfaces/design";

const TopHeader: React.FC<ITopHeader> = (props) => {
    const {collapsed, setCollapsed, themeMode, setThemeMode} = props;

    return (
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
    );
};

export default TopHeader;