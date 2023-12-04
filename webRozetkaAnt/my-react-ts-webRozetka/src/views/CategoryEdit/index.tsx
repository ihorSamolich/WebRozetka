import React, {useEffect, useState} from 'react';
import {Status} from "interfaces/enums";
import {Button, Divider, Form, Input, Image, Row, Spin, Upload, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useAppDispatch, useAppSelector} from "hooks/index.ts";
import {ICategoryItem} from "interfaces/categories";
import {getCategoryById, updateCategory} from "store/categories/categories.actions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile, UploadProps} from "antd/es/upload";
import {APP_ENV} from "../../env";

const CategoryEdit : React.FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.category.status);
    const {id} = useParams();
    const [form] = Form.useForm<ICategoryItem>();
    const selectedItem = useAppSelector((state) => state.category.selectedItem);
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState<UploadFile | null>(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        dispatch(getCategoryById(Number(id)));
    }, []);

    useEffect(() => {
        getDefaultData();
    }, [selectedItem]);

    const handlePreview = (file: UploadFile ) => {
        if (file) {
            if (!file.url && !file.preview) {
                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
            }
            setFile(file);
            setPreviewImage(file.url || (file.preview as string));
        } else {
            setFile(null);
            setPreviewImage(`${APP_ENV.BASE_URL}images/${selectedItem?.image}`);
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFile }) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
        handlePreview(newFileList[0]);
    };

    const getDefaultData = () => {
        if (selectedItem) {
            form.setFieldsValue({
                id: selectedItem.id,
                name: selectedItem.name,
                description: selectedItem.description,
                image: selectedItem.image
            });
            setPreviewImage(`${APP_ENV.BASE_URL}images/${selectedItem.image}`);
        }
    }

    const onFinish = async (values: any) => {
        values.image = file?.originFileObj;
        const response = await dispatch(updateCategory(values));

        if (response.meta.requestStatus === 'fulfilled') {
            handleSuccess();
            navigate('/categories/all')
        } else {
            handleError(response)
        }
    };

    const onCancel = () => {
        getDefaultData();
        setFile(null);
    };

    const handleError = (error: any) => {
        const errorsObject = error?.payload?.errors;
        let errorList = '';
        if (errorsObject) {
            for (const field in errorsObject) {
                const fieldErrors = errorsObject[field];
                errorList += fieldErrors.map((errorMessage: string) => `${errorMessage} `);
            }
            messageApi.open({
                type: 'error',
                duration: 10,
                content: errorList,
            });
        } else {
            messageApi.open({
                type: 'error',
                duration: 10,
                content: 'Непередбачувана помилка сервера!',
            });
        }
    };
    const handleSuccess = () => {
        messageApi.open({
            type: 'success',
            duration: 10,
            content: 'Категорію успішно створено!',
        });
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

                    <Form.Item label="Фото" htmlFor="image">
                        <Row style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                            <Image height={100} src={previewImage} style={{ borderRadius: 10 }} />

                            <Row style={{ marginLeft: 10 }}>
                                <Upload
                                    id="image"
                                    name="image"
                                    beforeUpload={() => false}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={handleChange}
                                    fileList={file ? [file] : []}
                                    accept="image/*"
                                >
                                    <Button icon={<UploadOutlined />}>Обрати нове фото</Button>
                                </Upload>
                            </Row>
                        </Row>
                    </Form.Item>

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
};

export default CategoryEdit;