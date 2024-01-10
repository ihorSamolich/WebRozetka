import React, {useEffect} from 'react';
//import {useParams} from "react-router-dom";
import {Divider, Row} from "antd";
import {getProductsByCategory} from "store/products/products.actions.ts";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import ProductCard from "components/ProductCard";
import {useParams} from "react-router-dom";
import {Status} from "constants/enums";
import { ItemsNotFound, SitePagination} from "components/index.ts";

const ProductsList : React.FC = () => {
    const {categoryId} = useParams();
    const dispatch = useAppDispatch();
    const { items, status} = useAppSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductsByCategory(Number(categoryId)));
    }, []);

    return (
        <Row gutter={16}>
            <Divider orientation="left">СПИСОК ТОВАРІВ</Divider>
            {items.length === 0 && status === Status.SUCCESS ? (
                <ItemsNotFound />
            ) : (
                items.map((item) => <ProductCard key={item.id} {...item} />)
            )}

            <SitePagination page={1} pageSize={4} totalItems={4} setPage={()=>{}} setPageSize={()=>{}} />
        </Row>
    );
};

export default ProductsList;