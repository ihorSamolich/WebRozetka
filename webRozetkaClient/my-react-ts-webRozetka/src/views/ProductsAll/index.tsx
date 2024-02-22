import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Flex, Form, Input, Row, Select, Slider, Space, Spin} from 'antd';
import {Status} from 'utils/enums';
import {ItemsNotFound, SitePagination} from 'components/index.ts';
import ProductCard from 'components/ProductCard';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {getProducts} from 'store/products/products.actions.ts';
import {IFilterParams, IQueryParameters} from 'interfaces/IQueryParameters.ts';
import {useCategoriesNamesData} from 'hooks/categories';

const ProductsAll : React.FC= () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [form] = Form.useForm<IFilterParams>();
    const dispatch = useAppDispatch();
    const { items,totalItems, status} = useAppSelector(state => state.product);
    const [formParams, setFormParams] = useState<IFilterParams>({
        categoryId: Number(searchParams.get('categoryId')) || undefined,
        query: searchParams.get('query') || undefined,
        price: [Number(searchParams.get('priceMin')), Number(searchParams.get('priceMax'))] || undefined,
        quantity: [Number(searchParams.get('quantityMin')), Number(searchParams.get('quantityMax'))] || undefined,
    });
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [pageSize, setPageSize] = useState<number>(Number(searchParams.get('pageCount')) || 8);

    const { data : categoriesNames , isLoading } = useCategoriesNamesData();
    const optionsData = [
        ...(categoriesNames?.map(item => ({ label: item.name, value: item.id })) || []),
        { label: 'Усі', value: 0 },
    ];

    useEffect(() => {
        const params = getQueryParams();
        updateSearchParams(params);
        dispatch(getProducts(params));
    }, [dispatch, page, pageSize, formParams]);

    const onFinish = (values: IFilterParams) => {
        setFormParams(values);
        setPage(1);
    };

    const onReset = () => {
        form.resetFields();
        if (Object.values(formParams).some(value => value !== undefined && value !== 0)) {
            setFormParams({categoryId: 0, price: undefined, quantity: undefined, query: undefined});
        }
        form.setFieldValue('price', [0,0]);
        form.setFieldValue('quantity', [0,0]);

    };

    const updateSearchParams = (params : IQueryParameters) =>{
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    const getQueryParams=()=>{
        const minPrice = formParams?.price?.length ? formParams?.price[0] : undefined;
        const maxPrice= formParams?.price?.length ? formParams?.price[1] : undefined;

        const minQuantity = formParams?.quantity?.length ? formParams?.quantity[0] : undefined;
        const maxQuantity= formParams?.quantity?.length ? formParams?.quantity[1] : undefined;

        const queryParams : IQueryParameters={
            page: page,
            pageCount: pageSize,
            query: formParams?.query,
            categoryId: formParams?.categoryId,
            priceMin: minPrice,
            priceMax: maxPrice,
            quantityMin: minQuantity,
            quantityMax: maxQuantity,
        };
        return queryParams;
    };

    return (
        <Spin spinning={status === Status.LOADING || isLoading}>

            <Divider orientation="left">СПИСОК ТОВАРІВ</Divider>

            <Row gutter={16}>
                <Col span={18}>
                    <Row>
                        {items.length === 0 && status === Status.SUCCESS ? (
                            <ItemsNotFound />
                        ) : (
                            items.map((item) =>
                                <ProductCard key={item.id} {...item} />,
                            )
                        )}
                    </Row>
                </Col>

                <Col span={6}>
                    <Row style={{padding: 20}}>
                        <Form
                            form={form}
                            name="filterForm"
                            onFinish={onFinish}
                            onReset={onReset}
                            layout="vertical"
                            style={{
                                minWidth: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                            initialValues={{
                                price: [Number(searchParams.get('priceMin')), Number(searchParams.get('priceMax'))] || [0,0],
                                quantity: [Number(searchParams.get('quantityMin')), Number(searchParams.get('quantityMax'))] || [0,0],
                            }}
                        >
                            <Space direction="vertical">
                                <Form.Item label="Назва товару:" name="query">
                                    <Input placeholder="Enter Name" />
                                </Form.Item>

                                <Form.Item label="Ціна:" name="price">
                                    <Slider
                                        range
                                        step={10}
                                    />
                                </Form.Item>

                                <Form.Item label="Категорія:" name="categoryId">
                                    <Select
                                        options={optionsData}
                                        placeholder="Select Category"
                                    />
                                </Form.Item>

                                <Form.Item label="Кількість:" name="quantity">
                                    <Slider
                                        range
                                        step={10}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Flex gap={10} justify={'center'}>
                                        <Button type="primary" htmlType="submit">
                                            Застосувати
                                        </Button>
                                        <Button type="primary" danger htmlType="reset">
                                            Очистити
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Space>
                        </Form>
                    </Row>
                </Col>

                <SitePagination page={page} pageSize={pageSize} totalItems={totalItems} setPage={setPage} setPageSize={setPageSize} />
            </Row>
        </Spin>

    );
};

export default ProductsAll;