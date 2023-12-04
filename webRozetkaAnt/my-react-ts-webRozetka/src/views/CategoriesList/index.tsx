import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/index.ts";
import {getCategories} from "store/categories/categories.actions.ts";
import {Divider, Pagination, Row} from "antd";
import CategoryCard from "components/CategoryCard";
import SkeletonCategoryCard from "components/SkeletonCategoryCard";
import ServerError from "components/ServerError";
import {Status} from "interfaces/enums";

const CategoriesList : React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.items);
    const status = useAppSelector((state) => state.category.status);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    if (status === Status.ERROR){
        return <ServerError/>
    }

    return (
        <Row gutter={16} >
            <Divider orientation="left">КАТЕГОРІЇ</Divider>

            {status === Status.LOADING ?
                (Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCategoryCard key={index}/>
                )))
                : (categories.map((item) => (
                    <CategoryCard key={item.id} {...item} />
                )))
            }

            <div style={{width: '100%' ,display: "flex", justifyContent: 'center'}}>
                <Pagination  showSizeChanger={false} defaultCurrent={1} total={200} />
            </div>
        </Row>
    );
}

export default CategoriesList;