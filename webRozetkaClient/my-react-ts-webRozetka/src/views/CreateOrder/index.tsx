import React, {useEffect, useState} from 'react';
import {Row,Divider,Col,Steps,Button,Typography,Result,Spin,notification} from 'antd';
import { ArrowLeftOutlined, SmileOutlined } from '@ant-design/icons';
import {IOrder, IOrderDelivery, IOrderPayment, IOrderUser} from 'interfaces/order';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import OrderCard from 'components/OrderProductCard';
import {useAddOrderData} from 'hooks/order';
import {openNotification} from 'utils/notification';
import {useNavigate} from 'react-router-dom';
import {clearBasket} from 'store/basket/basket.actions.ts';
import OrderUserData from 'components/OrderUserData';
import OrderDeliveryData from 'components/OrderDeliveryData';
import OrderPaymentData from 'components/OrderPaymentData';

const defaultFormData : IOrder = {
    user: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    },
    delivery: {
        areaRef: '',
        settlementRef: '',
        warehouseRef: '',
    },
    payment: {
        paymentType: '',
    },
};

const CreateOrder: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState<IOrder>(defaultFormData);
    const [notificationApi, contextHolder] = notification.useNotification();
    const {items : basketItems, allPriceProducts} = useAppSelector(state => state.basket);
    const {mutate : addOrder, isLoading, isError, isSuccess} = useAddOrderData();

    useEffect(() => {
        if (isError) {
            openNotification('error', notificationApi, 'Помилка', 'Щось пішло не так. Будь ласка, спробуйте ще раз.');
        }
        if(isSuccess){
            openNotification('success',notificationApi, 'Успішно', 'Замовлення успішно створено!');
            dispatch(clearBasket());
            setTimeout(()=> navigate('/'), 3000);
        }
    }, [isError, isSuccess, notificationApi]);

    const handleCreateOrder = () =>{
        if (basketItems.length) {
            addOrder(
                {
                    customerPersonalData: formData.user,
                    departmentData: formData.delivery,
                    paymentData: formData.payment,
                },
            );
        }
        else {
            openNotification('error', notificationApi, 'Помилка', 'Щось пішло не так. Будь ласка, Перевірте наявність товарів у корзині!');
        }
    };

    const updateFormData = (stepName: string, values: IOrderUser | IOrderPayment | IOrderDelivery) => {
        setFormData((prevData) => ({...prevData, [stepName]: values}));
    };

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const steps = [
        {
            title: 'Контактні дані',
            content: <OrderUserData updateFormData={updateFormData} next={next} />,
        },
        {
            title: 'Доставка',
            content: <OrderDeliveryData updateFormData={updateFormData} next={next}/>,
        },
        {
            title: 'Оплата',
            content: <OrderPaymentData  updateFormData={updateFormData} next={next}/>,
        },
    ];
    const items = steps.map((item) => ({key: item.title, title: item.title}));

    return (
        <Spin spinning={isLoading}>
            {contextHolder}
            <Row gutter={16}>
                <Divider orientation="left">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</Divider>
                <Col span={16}>
                    <Steps current={current} style={{marginBottom: 20}} items={items}/>
                    {
                        current < items.length ?
                            <>
                                <div>
                                    {current > 0 && (
                                        <Button type="link" icon={<ArrowLeftOutlined />} style={{margin: '0 0 15px 0', padding: 0}} onClick={() => prev()}>
                                Повернутися до попереднього кроку
                                        </Button>
                                    )}
                                </div>

                                <div>{steps[current].content}</div>
                            </>
                            :
                            <Result
                                icon={<SmileOutlined />}
                                title="Чудово, все готово для офрмлення замовлення!"
                                extra=
                                    {
                                        <Button
                                            type="primary"
                                            onClick={handleCreateOrder}
                                        >
                                            Підтвердити замовлення
                                        </Button>
                                    }
                            />
                    }
                </Col>
                <Col span={8}>
                    {
                        basketItems.map((item) =>
                            <OrderCard
                                key={item.productId}
                                {...item}
                            />)
                    }
                    <Divider/>
                    <Typography.Title level={4} style={{ margin: 5, textAlign:'center' }}>
                        Сума замовлення {allPriceProducts} грн
                    </Typography.Title>
                </Col>
            </Row>
        </Spin>
    );
};

export default CreateOrder;

