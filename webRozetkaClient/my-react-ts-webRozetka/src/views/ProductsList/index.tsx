import React, {useEffect} from 'react';
import {Divider, Row} from 'antd';
import {getProductsByCategory} from 'store/products/products.actions.ts';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import ProductCard from 'components/ProductCard';
import {useParams} from 'react-router-dom';
import {Status} from 'utils/enums';
import { ItemsNotFound, SitePagination} from 'components/index.ts';

const ProductsList : React.FC = () => {
    const {categoryId} = useParams();
    const dispatch = useAppDispatch();
    const { items, status} = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductsByCategory(Number(categoryId)));
    }, [categoryId, dispatch]);

    return (
        <Row gutter={16}>
            <Divider orientation="left">СПИСОК ТОВАРІВ</Divider>
            {items.length === 0 && status === Status.SUCCESS ? (
                <ItemsNotFound />
            ) : (
                items.map((item) =>
                    <ProductCard key={item.id} {...item} />,
                )
            )}

            <SitePagination page={1} pageSize={4} totalItems={items.length} setPage={()=>{}} setPageSize={()=>{}} />
        </Row>
    );
};

export default ProductsList;