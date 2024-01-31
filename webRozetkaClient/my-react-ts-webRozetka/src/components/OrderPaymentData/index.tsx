import React from 'react';
import { Button, Form, Radio, Space } from 'antd';
import {IOrderPayment} from 'interfaces/order';

interface IOrderPaymentDataProps {
    updateFormData: (stepName: string, values: IOrderPayment) => void;
    next: () => void;
}

const OrderPaymentData: React.FC<IOrderPaymentDataProps> = ({ updateFormData, next }) => {
    return (
        <Form
            name="payment"
            layout="vertical"
            onFinish={(values) => {
                updateFormData('payment', values);
                next();
            }}
        >
            <Form.Item name={'paymentType'} label="Спосіб Оплати" rules={[{ required: true }]}>
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
    );
};

export default OrderPaymentData;
