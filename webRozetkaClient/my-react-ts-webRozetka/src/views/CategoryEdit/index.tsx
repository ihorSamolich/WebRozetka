import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Image, Row, Spin, Upload, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ICategoryItem, ICategoryUpdate } from 'interfaces/categories';
import {useNavigate, useParams} from 'react-router-dom';
import { UploadOutlined} from '@ant-design/icons';
import {RcFile} from 'antd/es/upload';
import {APP_ENV} from 'env';
import {imageConverterToFile} from 'utils/converters/imageConverterToFile.ts';
import {useCategoryData, useUpdateCategoryData} from 'hooks/categories';
import {ServerError} from 'components/index.ts';
import {openNotification} from 'utils/notification';

const CategoryEdit : React.FC = () => {
    const {id} = useParams();
    const [form] = Form.useForm<ICategoryUpdate>();
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const [notificationApi, contextHolder] = notification.useNotification();
    const {mutate : updateCategory, isSuccess, isError} = useUpdateCategoryData();
    const {isLoading, data: category, isError: isGetError,error: errorGet} = useCategoryData(Number(id));

    useEffect(() => {
        if (isError) {
            openNotification('error', notificationApi, 'Помилка', 'Щось пішло не так. Будь ласка, спробуйте ще раз.');
        }
        if(isSuccess){
            openNotification('success',notificationApi, 'Успішно', 'Категорію успішно оновлено!');
            navigate('/categories');
        }
    }, [isError, isSuccess]);
    
    const onCancel = () => {
        if (category) {
            form.resetFields();
            setDefaultData(category);
        }
    };

    useEffect(() => {
        if (category) {
            setDefaultData(category);
        }
    }, [category]);

    const setDefaultData = (data : ICategoryItem) => {
        if (data) {
            form.setFieldsValue(data);
            setPreviewImage(`${APP_ENV.BASE_URL}images/${data.image}`);
        }
    };
    
    const handlePreview = () => {
        const file : File = form.getFieldValue('image');

        console.log(file);

        if (file) {
            setPreviewImage(URL.createObjectURL(file as RcFile));
        } else {
            setPreviewImage(`${APP_ENV.BASE_URL}images/${category?.image}`);
        }
    };

    const onFinish = (values : ICategoryUpdate) => {
        updateCategory(values);
    };

    if (isGetError){
        return <ServerError error = {errorGet?.message} />;
    }

    return (
        <Spin spinning={isLoading}>
            <Row gutter={16}>
                {contextHolder}
                <Divider orientation="left">РЕДАГУВАТИ КАТЕГОРІЮ</Divider>
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
                        label="ID"
                        name="id"
                        htmlFor="id"
                        rules={[
                            {required: true},
                        ]}
                    >
                        <Input disabled/>
                    </Form.Item>

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

                    <Row style={{display: 'flex', alignItems: 'center', flexWrap: 'nowrap'}}>
                        <Image height={120}
                            src={previewImage || 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'}
                            style={{borderRadius: 10}}/>
                        <Form.Item
                            style={{margin: 0, marginLeft: 10}}
                            name="image"
                            valuePropName="file"
                            getValueFromEvent={imageConverterToFile}
                        >
                            <Upload
                                showUploadList={{showPreviewIcon: false}}
                                onChange={handlePreview}
                                beforeUpload={() => false}
                                accept="image/*"
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined/>}>Обрати нове фото</Button>
                            </Upload>
                        </Form.Item>
                    </Row>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={onCancel}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Spin>
    );
};

export default CategoryEdit;