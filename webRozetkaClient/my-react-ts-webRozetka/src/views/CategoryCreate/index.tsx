import React, {useEffect} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, Form, Input, notification, Row, Spin, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {ICategoryCreate} from 'interfaces/categories';
import {imageConverterToFile} from 'utils/converters/imageConverterToFile.ts';
import {useAddCategoryData} from 'hooks/categories';
import {openNotification} from 'utils/notification';

const CategoryCreate: React.FC = () => {
    const [form] = Form.useForm<ICategoryCreate>();
    const [notificationApi, contextHolder] = notification.useNotification();
    const {mutate : addCategory, isLoading, isError, isSuccess} = useAddCategoryData();

    useEffect(() => {
        if (isError) {
            openNotification('error', notificationApi, 'Помилка', 'Щось пішло не так. Будь ласка, спробуйте ще раз.');
        }
        if(isSuccess){
            openNotification('success',notificationApi, 'Успішно', 'Категорію успішно створено!');
            form.resetFields();
        }
    }, [form, isError, isSuccess, notificationApi]);
    
    const onReset = () => {
        form.resetFields();
    };

    const onFinish = async (values: ICategoryCreate) =>{
        addCategory(values);
    };

    return (
        <Spin spinning={isLoading}>
            {contextHolder}
            <Row gutter={16}>
                <Divider orientation="left">CТВОРИТИ КАТЕГОРІЮ</Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 20,
                    }}
                >
                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
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
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
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
    );
};

export default CategoryCreate;


