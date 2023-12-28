import { useAppDispatch, useAppSelector } from "hooks";
import {Divider, Flex, Row} from "antd";
import { CategoryCard, SkeletonCategoryCard, ServerError, SitePagination } from "components";
import { Status } from "constants/enums";
import React, { useEffect, useState } from "react";
import { getCategories } from "store/categories/categories.actions.ts";
import { useNavigate } from 'react-router-dom';
import Search from "antd/es/input/Search";

const CategoriesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, items, totalItems } = useAppSelector((state) => state.category);
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    // зробити select page size
    const [pageSize] = useState<number>(4);

    useEffect(() => {
        dispatch(getCategories({ page, pageSize }));

        if (page > 1) {
            navigate(`/categories/all/page/${page}`);
        } else if (page === 1) {
            navigate('/categories/all');
        }
    }, [page]);

    if (status === Status.ERROR) {
        return <ServerError />;
    }

    return (
        <Row gutter={16}>
            <Divider orientation="left">
                <Flex align="center" gap="20px">
                    КАТЕГОРІЇ
                    <Search
                        style={{width: 200}}
                        placeholder="я шукаю..."
                        onSearch={()=>{console.log('dd')}}
                        enterButton
                    />
                </Flex>
            </Divider>

            {status === Status.LOADING ?
                (Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCategoryCard key={index} />
                )))
                : (items.map((item) => (
                    <CategoryCard key={item.id} {...item} />
                )))
            }

            <SitePagination page={page} pageSize={pageSize} totalItems={totalItems} setPage={setPage} />
        </Row>
    );
}

export default CategoriesList;
