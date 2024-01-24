import React, {useState} from 'react';
import {FloatButton, Drawer, Button, Flex, Typography, Empty} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import BasketCard from 'components/BasketCard';
import {clearBasket} from 'store/basket/basket.slice.ts';
import emptyBasket from 'assets/empty-shopping-cart.png';
import {useNavigate} from 'react-router-dom';

const {Title,Text} = Typography;

const Basket : React.FC = () => {
    const [open, setOpen] = useState(false);
    const {allPriceProducts, items} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleClearBasket = () => {
        dispatch(clearBasket());
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleCreateOrder = () => {
        navigate('/checkout/order');
        onClose();
    };

    return (
        <>
            <FloatButton onClick={showDrawer} badge={{color: 'orange', count: items.length}}
                icon={<ShoppingCartOutlined/>}/>

            <Drawer
                width={450}
                placement="right"
                onClose={onClose}
                open={open}
                title={
                    <Flex justify={'space-between'} align={'center'}>
                        <Title level={4} style={{margin: 0}}> МОЯ КОРЗИНА</Title>
                        {
                            items.length > 0 && <Flex justify={'flex-end'}>
                                <Button
                                    size={'small'}
                                    type="primary" danger
                                    onClick={handleClearBasket}
                                >
                                        ОЧИСТИТИ
                                </Button>
                            </Flex>
                        }
                    </Flex>
                }
                footer={
                    <Button
                        disabled={items.length === 0}
                        style={{width: '100%', backgroundColor: '#371f5e'}}
                        type="primary"
                        onClick={handleCreateOrder}
                    >
                        <Text strong style={{color:'#fff'}}>
                            ОФОРМИТИ ЗАМОВЛЕННЯ
                            {items.length > 0 && `  |  ${allPriceProducts.toFixed(2)} грн`}
                        </Text>
                    </Button>
                }
            >
                {
                    items.length === 0 &&
                    <Empty
                        image={emptyBasket}
                        imageStyle={{height: 60}}
                        description={
                            <Text type="warning">КОРЗИНА ПОРОЖНЯ!</Text>
                        }
                    >
                    </Empty>
                }
                {
                    items.map((item) =>
                        <BasketCard
                            key={item.product.id}
                            {...item}
                        />)
                }
            </Drawer>
        </>
    );
};

export default Basket;