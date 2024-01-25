import React from 'react';
import {Button, Divider, Flex, Form, Input, message, Row, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useAppDispatch} from 'hooks/redux';
import {register} from 'store/accounts/accounts.actions.ts';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNotification} from 'hooks/notification';
import {autoLogin} from 'store/accounts/accounts.slice.ts';
import {useNavigate} from 'react-router-dom';
import {IRegistration, IRegistrationForm} from 'interfaces/account';
import {imageConverterToAntFile } from 'utils/converters/imageConverterToAntFile.ts';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Registration : React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);

    const onFinish = async (values: IRegistrationForm) => {
        const { image, ...restValues } = values;

        const data: IRegistration = {
            ...restValues,
            imageBase64: image?.thumbUrl,
        };

        try {
            const response =  await dispatch(register(data));
            unwrapResult(response);
            const { token } = response.payload;
            localStorage.setItem('authToken', token);
            dispatch(autoLogin(token));
            navigate('/');
        }
        catch (error) {
            handleError(error);
        }
    };


    return (
        <Row gutter={16}>
            {contextHolder}
            <Divider orientation="left">Реєстрація</Divider>
            <Flex vertical style={{width: '100%'}} align="center" justify="center">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{width: 700}}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="Електронна пошта"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Please password min length 6 symbols!' },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Повторіть Пароль"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="firstname"
                        label="Ім'я"
                        rules={[{required: true, message: 'Please input your firstname!', whitespace: false}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Прізвище"
                        rules={[{required: true, message: 'Please input your lastname!', whitespace: true}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={imageConverterToAntFile}
                        rules={[{required: true, message: 'Please select your avatar!'}]}
                    >
                        <Upload
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            showUploadList={{showPreviewIcon: false}}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Зареєструватися
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Row>
    );
};

export default Registration;