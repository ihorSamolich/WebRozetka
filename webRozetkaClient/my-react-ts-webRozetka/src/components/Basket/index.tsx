import React, {useState} from 'react';
import {FloatButton, Drawer} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
const Basket : React.FC = () => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FloatButton onClick={showDrawer} badge={{color: 'orange', count: 12 }} icon={<ShoppingCartOutlined />} />

            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};

export default Basket;