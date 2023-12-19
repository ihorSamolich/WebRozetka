import React, {useEffect, useState} from 'react';
import {Status} from "constants/enums";
import {Button, Divider, Form, Input, Image, Row, Spin, Upload, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {ICategoryItem} from "interfaces/categories";
import {getCategoryById, updateCategory} from "store/categories/categories.actions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile, UploadProps} from "antd/es/upload";
import {APP_ENV} from "../../env";
import {useNotification} from "hooks/notificationHook";
import {unwrapResult} from "@reduxjs/toolkit";

const CategoryEdit : React.FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.category.status);
    const {id} = useParams();
    const [form] = Form.useForm<ICategoryItem>();
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState<UploadFile | null>(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleSuccess, handleError} = useNotification(messageApi);
    const [category, setCategory] = useState<ICategoryItem | null>(null)

    useEffect(() => {
        dispatch(getCategoryById(Number(id)))
            .then((action) => {
                const data   = action.payload as ICategoryItem;

                if (data) {
                    setCategory(data);
                    setDefaultData(data);
                } else {
                    throw new Error();
                }
            })
            .catch(()=> {
                    navigate('/categories/all');
                }
            )
    }, [id]);

    const setDefaultData = (data : ICategoryItem) => {
        if (data) {
            form.setFieldsValue(data);
            setPreviewImage(`${APP_ENV.BASE_URL}images/${data.image}`);
        }
    }
    const handlePreview = (file: UploadFile) => {
        if (file) {
            if (!file.url && !file.preview) {
                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
            }
            setFile(file);
            setPreviewImage(file.url || (file.preview as string));
        } else {
            setFile(null);
            setPreviewImage(`${APP_ENV.BASE_URL}images/${category?.image}`);
        }
    };
    const handleChange: UploadProps['onChange'] = ({fileList: newFile}) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
        handlePreview(newFileList[0]);
    };

    const onFinish = async (values: any) => {
        values.image = values.image.file;

        try {
            const result = await dispatch(updateCategory(values));
            unwrapResult(result);
            handleSuccess('Категорію успішно оновлено!');
            setTimeout(() => {
                navigate('/categories/all');
            }, 1000);
        } catch (error) {
            console.log(error)
            handleError(error);
        }
    };

    const onCancel = () => {
        if (category) {
            setDefaultData(category);
        }
        setFile(null);
    };

    return (
        <Spin spinning={status === Status.LOADING}>
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
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: 20
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

                    <Row style={{display: 'flex', alignItems: 'center', flexWrap: 'nowrap'}}>

                        <Image height={120}
                               src={previewImage || 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'}
                               style={{borderRadius: 10}}/>

                        <Form.Item name="image" style={{margin: 0, marginLeft: 10}}>
                            <Upload
                                name="logo"
                                beforeUpload={() => false}
                                listType="picture"
                                maxCount={1}
                                onChange={handleChange}
                                fileList={file ? [file] : []}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined/>}>Обрати нове фото</Button>
                            </Upload>
                        </Form.Item>
                    </Row>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Spin>
    );
}

export default CategoryEdit;