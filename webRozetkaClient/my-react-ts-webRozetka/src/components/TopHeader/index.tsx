import React, {useEffect, useState} from 'react';
import {PRIMARY_BLUE_COLOR} from 'utils/constants/index.ts';
import {Avatar, Button, Switch} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {Header} from 'antd/es/layout/layout';
import {ITopHeader} from 'interfaces/design';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import ButtonGroup from 'antd/es/button/button-group';
import {logout} from 'store/accounts/accounts.slice.ts';
import {APP_ENV} from 'env/index.ts';


const TopHeader: React.FC<ITopHeader> = (props) => {
    const {collapsed, setCollapsed, themeMode, setThemeMode} = props;
    const [show, setShow] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const {isLogin, user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 0) {
                if (window.scrollY > lastScrollY) {
                    setShow(false);

                } else {
                    setShow(true);
                }
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);


    const handleLogout = () => {
        dispatch(logout());
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
            transition: 'all 1s',
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

            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{display: 'flex'}}
                        icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.image}`}/>}
                    >
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined/>}
                        onClick={() => handleLogout()}
                    />
                </ButtonGroup>

            ) : (
                <Link to="/account/login" style={{color: 'inherit', textDecoration: 'none'}}>
                    <Button type="primary" icon={<UserOutlined/>}>
                        Увійти
                    </Button>
                </Link>
            )}

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