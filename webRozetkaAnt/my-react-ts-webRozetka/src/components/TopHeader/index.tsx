import React, {useEffect, useState} from 'react';
import {PRIMARY_BLUE_COLOR} from "constants/index.ts";
import {Button, Switch} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {ITopHeader} from "interfaces/design";

const TopHeader: React.FC<ITopHeader> = (props) => {
    const {collapsed, setCollapsed, themeMode, setThemeMode} = props;
    const [show, setShow] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const controlNavbar = () => {
        if (window.scrollY > 0) {
            if (window.scrollY > lastScrollY) {
                setShow(false);

            } else {
                setShow(true)
            }
        } else {
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    return (
        <Header style={{
            padding: 0,
            background: PRIMARY_BLUE_COLOR,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            position: show ? 'sticky' : 'relative',
            top: 0,
            transition: 'all 1s'
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