import React, {useEffect, useState} from 'react';
import {
    Button,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Spin,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import {Status} from 'utils/enums';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useNavigate, useParams} from 'react-router-dom';
import { getProductById, updateProduct} from 'store/products/products.actions.ts';
import TextArea from 'antd/es/input/TextArea';
import {useCategoriesNamesData} from 'hooks/categories';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNotification} from 'hooks/notification';
import {PlusOutlined} from '@ant-design/icons';
import {APP_ENV} from 'env/index.ts';
import {IProductEdit, IProductEditPhoto, IProductItem} from 'interfaces/product';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import DraggableUploadListItem from 'components/DraggableUploadListItem';


const ProductEdit : React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);
    const {productId} = useParams();
    const { status, selectedItem } = useAppSelector(state => state.product);
    const [form] = Form.useForm<IProductEdit>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data : categoriesNames , isLoading } = useCategoriesNamesData();
    const optionsData = categoriesNames?.map(item => ({label: item.name, value: item.id}));

    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    useEffect(() => {
        dispatch(getProductById(Number(productId)));
    },[dispatch, productId]);

    useEffect(() => {
        setDefaultData(selectedItem);
    }, [selectedItem]);

    const onFinish = async (values: IProductEdit) => {

        const oldPhotos : IProductEditPhoto[] = [];
        const newPhotos: IProductEditPhoto[] = [];

        for (let i = 0; i < fileList.length; i++) {
            if (!fileList[i].size){
                oldPhotos.push({photo: fileList[i].name, priority: i});
            }
            else {
                newPhotos.push({photo: fileList[i].thumbUrl, priority: i});
            }
        }

        try {
            const response = await dispatch(updateProduct({...values, id: Number(productId), newPhotos: newPhotos, oldPhotos: oldPhotos}));
            unwrapResult(response);
            navigate(`/product/${productId}`);
        } catch (error) {
            handleError(error);
        }
    };

    const onChangePrice = (value: string | null) => {
        form.setFieldValue('price', value?.replace('.', ','));
    };

    const setDefaultData = (data: IProductItem | null) => {
        if (data) {

            if (data.photos?.length){
                setFileList([]);
            }

            const newFileList : UploadFile[] = [];

            for (let i = 0; i < data.photos.length; i++) {
                newFileList.push({
                    uid: data.photos[i],
                    name: data.photos[i],
                    status: 'done',
                    url: `${APP_ENV.BASE_URL}images/${data.photos[i]}`,
                });
                
            }
            setFileList(newFileList);

            const formattedPrice = String(data.price).replace('.', ',');
            form.setFieldsValue({
                ...data,
                price: formattedPrice,
            });
        }
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                    >
                        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                            <SortableContext items={fileList.map((i) => i.uid)} strategy={horizontalListSortingStrategy}>
                                <Upload
                                    showUploadList={{showPreviewIcon: false}}
                                    beforeUpload={() => false}
                                    accept="image/*"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    itemRender={(originNode, file) => (
                                        <DraggableUploadListItem originNode={originNode} file={file} />
                                    )}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                            </SortableContext>
                        </DndContext>
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

export default ProductEdit;