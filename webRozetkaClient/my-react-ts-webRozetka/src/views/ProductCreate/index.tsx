import React, {useEffect } from 'react';
import {Button, Divider, Form, Input, InputNumber, message, Row, Select, Spin, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {IProductCreate } from 'interfaces/product';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {getCategoriesNames} from 'store/categories/categories.actions.ts';
import {DownloadOutlined } from '@ant-design/icons';
import {imageConverterToFileArray} from 'utils/converters/imageConverterToFileArray.ts';
import {addProduct} from 'store/products/products.actions.ts';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';
import {useNotification} from 'hooks/notification';
import {Status} from 'utils/enums';
import {useCategoriesNamesData} from 'hooks/categories';

const ProductCreate : React.FC = () => {

    const [form] = Form.useForm<IProductCreate>();
    const status = useAppSelector(state => state.product.status);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);
    const { data : categoriesNames , isLoading } = useCategoriesNamesData();
    const optionsData = categoriesNames?.map(item => ({label: item.name, value: item.id}));

    useEffect(() => {
        dispatch(getCategoriesNames());
    }, [dispatch]);

    const onFinish = async (values: IProductCreate) => {
        try {
            const response = await dispatch(addProduct(values));
            unwrapResult(response);
            navigate(`/categories/products-category/${values.categoryId}`);
        } catch (error) {
            handleError(error);
        }
    };

    const onChangePrice = (value: string | null) => {
        form.setFieldValue('price', value?.replace('.', ','));
    };

    return (
        <Spin spinning={status === Status.LOADING || isLoading}>
            <Row gutter={16}>
                {contextHolder}
                <Divider orientation="left">ДОДАТИ ТОВАР</Divider>
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
                    initialValues={{
                        ['price']: 100,
                        ['quantity']: 100,
                        ['discount']: 0,
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
                        label="Країна виготовлення"
                        name="country"
                        htmlFor="country"
                        rules={[
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Виробник"
                        name="manufacturer"
                        htmlFor="manufacturer"
                        rules={[
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Ціна"
                        name="price"
                        htmlFor="price"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <InputNumber<string>
                            stringMode={true}
                            onChange={onChangePrice}
                            decimalSeparator=","
                            step={0.01}
                            addonAfter="ШТ"
                            min="0"
                        />
                    </Form.Item>

                    <Form.Item
                        label="К-сть доступних од. товару"
                        name="quantity"
                        htmlFor="quantity"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <InputNumber addonAfter="ШТ" min={0}/>
                    </Form.Item>

                    <Form.Item
                        label="Знижка"
                        name="discount"
                        htmlFor="discount"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <InputNumber addonAfter="%" min={0} max={100}/>
                    </Form.Item>

                    <Form.Item
                        label="Категорія"
                        name="categoryId"
                        htmlFor="categoryId"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Select
                            placeholder="Оберіть категорію: "
                            options={optionsData}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Фото"
                        name="images"
                        htmlFor="images"
                        valuePropName="file"
                        getValueFromEvent={imageConverterToFileArray}
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={10}
                            multiple
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                        >
                            <Button type="primary" shape="round" icon={<DownloadOutlined/>}/>
                        </Upload>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button style={{margin: 10}} htmlType="button">
                            Reset
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Spin>
    );
};

export default ProductCreate;