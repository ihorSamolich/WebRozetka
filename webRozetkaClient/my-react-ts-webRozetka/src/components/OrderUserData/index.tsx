import React from 'react';
import { Button, Form, Input } from 'antd';
import {IOrderUser} from 'interfaces/order';

interface IOrderUserDataProps {
    updateFormData: (stepName: string, values: IOrderUser) => void;
    next: () => void;
}

const OrderUserData: React.FC<IOrderUserDataProps> = ({ updateFormData, next }) => {
    const handleUserData = (values: IOrderUser) => {
        updateFormData('user', values);
        next();
    };

    return (
        <Form
            name="user"
            layout="vertical"
            onFinish={handleUserData}
        >
            <Form.Item name={'firstName'} label="Ім'я" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'lastName'} label="Прізвище" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'phone'} label="Телефон" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'email'} label="Електронна адреса" rules={[{ required: true }, { type: 'email' }]}>
                <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Далі
            </Button>
        </Form>
    );
};

export default OrderUserData;
