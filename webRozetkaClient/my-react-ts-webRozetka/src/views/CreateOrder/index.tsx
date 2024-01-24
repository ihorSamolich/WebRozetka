import React, {useEffect, useState} from 'react';
import {
    Row,
    Divider,
    Col,
    Steps,
    Button,
    Form,
    Input,
    Radio,
    Select,
    Space,
    Typography,
    Result,
    Spin,
    notification,
} from 'antd';
import { ArrowLeftOutlined, SmileOutlined } from '@ant-design/icons';
import {IOrder, IOrderDelivery, IOrderPayment, IOrderProduct, IOrderUser} from 'interfaces/order';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import OrderCard from 'components/OrderProductCard';
import {useAddOrderData} from 'hooks/order';
import {openNotification} from 'utils/notification';
import {useNavigate} from 'react-router-dom';
import {clearBasket} from 'store/basket/basket.slice.ts';

const CreateOrder: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState<IOrder>({
        user: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
        },
        delivery: {
            cityId: 0,
            deliveryServiceId: 0,
            departmentNumberId: 0,
        },
        payment: {
            paymentType: '',
        },
    });
    const {user} = useAppSelector(state => state.account);
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
        const orders: IOrderProduct[] = basketItems.map(item => ({ quantity: item.count, productId: item.product.id }));
        if (user && orders.length) {
            addOrder(
                {
                    customerPersonalData: formData.user,
                    departmentData: formData.delivery,
                    userEmail: user.email,
                    orderProducts: orders,
                },
            );
        }
        else {
            openNotification('error', notificationApi, 'Помилка', 'Щось пішло не так. Будь ласка, Перевірте наявність товарів у корзині!');
        }
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const updateFormData = (stepName: string, values: IOrderUser | IOrderPayment | IOrderDelivery) => {
        setFormData((prevData) => ({...prevData, [stepName]: values}));
    };

    const steps = [
        {
            title: 'Контактні дані',
            content: (
                <Form
                    name="user"
                    layout="vertical"
                    onFinish={(values) => {
                        updateFormData('user', values);
                        next();
                    }}
                >
                    <Form.Item name={'firstName'} label="Ім'я" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'lastName'} label="Прізвище" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'phone'} label="Телефон" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'email'} label="Електронна адреса" rules={[{required: true},{type: 'email'}]}>
                        <Input/>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Далі
                    </Button>
                </Form>
            ),
        },
        {
            title: 'Доставка',
            content: (
                <Form
                    name="delivery"
                    layout="vertical"
                    onFinish={(values) => {
                        updateFormData('delivery', values);
                        next();
                    }}
                >
                    <Form.Item name={'cityId'} label="Ваше місто" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value={1}>Київ</Select.Option>
                            <Select.Option value={2}>Харків</Select.Option>
                            <Select.Option value={3}>Одеса</Select.Option>
                            <Select.Option value={4}>Дніпро</Select.Option>
                            <Select.Option value={5}>Львів</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'deliveryServiceId'} label="Спосіб доставки" rules={[{required: true}]}>
                        <Radio.Group>
                            <Radio value={1}>Нова Пошта</Radio>
                            <Radio value={2}>Укрпошта</Radio>
                            <Radio value={3}>MeestExpress</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={'departmentNumberId'} label="Номер відділення" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value={1}>1</Select.Option>
                            <Select.Option value={2}>2</Select.Option>
                            <Select.Option value={3}>3</Select.Option>
                            <Select.Option value={4}>4</Select.Option>
                            <Select.Option value={5}>5</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Далі
                    </Button>
                </Form>
            ),
        },
        {
            title: 'Оплата',
            content: (
                <Form
                    name="payment"
                    layout="vertical"
                    onFinish={(values) => {
                        updateFormData('payment', values);
                        next();
                    }}
                >
                    <Form.Item name={'paymentType'} label="Спосіб Оплати" rules={[{required: true}]}>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="1">Картою на сайті</Radio>
                                <Radio value="2">При отриманні</Radio>
                                <Radio value="3">Розрахунуовий рахунок</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Далі
                    </Button>
                </Form>
            ),
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
                                key={item.product.id}
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
