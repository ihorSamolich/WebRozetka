import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, Form, Input, message, Modal, Row, Spin, Upload} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import TextArea from "antd/es/input/TextArea";
import {ICategoryCreate} from "interfaces/categories";
import {addCategory} from "store/categories/categories.actions.ts";
import {useAppDispatch, useAppSelector} from "hooks/index.ts";
import {Status} from "interfaces/enums";

const CategoryCreate: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const status = useAppSelector((state) => state.category.status);

    const [file, setFile] = useState<UploadFile | null>();
    const [form] = Form.useForm<ICategoryCreate>();
    const dispatch = useAppDispatch();

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({fileList: newFile}) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
    };
    const onReset = () => {
        onClear();
    };
    const onFinish = async (values: any) => {
        if (values.image) {
            values.image = values.image.file;
        }

        console.log(values)

        const response = await dispatch((addCategory(values)));

        if (response.meta.requestStatus === 'fulfilled') {
            handleSuccess();
            onClear();
        } else {
            handleError(response)
        }
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
    const onClear = () => {
        form.resetFields();
        setFile(null)
    }

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
                        label="Фото"
                        name="image"
                    >
                        <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            id='image'
                            listType="picture-card"
                            onChange={handleChange}
                            onPreview={handlePreview}
                            fileList={file ? [file] : []}
                            accept="image/*"
                        >
                            {file ? null :
                                (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
                                    </div>)
                            }
                        </Upload>
                    </Form.Item>

                    <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>

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


