import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, Form, Input, message, Row, Spin, Upload} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {ICategoryCreate,} from "interfaces/categories";
import {addCategory} from "store/categories/categories.actions.ts";
import {useAppDispatch, useAppSelector, useNotification} from "hooks";
import {Status} from "constants/enums";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {imageConverterToFile} from "utils/imageConverterToFile.ts";

const CategoryCreate: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector((state) => state.category.status);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<ICategoryCreate>();
    const { handleSuccess, handleError } = useNotification(messageApi);

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = async (values: ICategoryCreate) => {
        try {
            const result = await dispatch(addCategory(values));
            unwrapResult(result);
            handleSuccess('Категорію успішно створено!');
            setTimeout(() => {
                navigate('/categories/all');
            }, 1000);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Spin spinning={status === Status.LOADING}>
            <Row gutter={16}>
                {contextHolder}
                <Divider orientation="left">CТВОРИТИ КАТЕГОРІЮ</Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: 20
                    }}
                >
                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'}
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'}
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={imageConverterToFile}
                        rules={[{required: true, message: 'Оберіть фото категорії!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Spin>
    )
}

export default CategoryCreate


