import { useAppDispatch, useAppSelector } from 'hooks';
import { Divider, Flex, Row} from 'antd';
import { CategoryCard, SkeletonCategoryCard, ServerError, SitePagination, ItemsNotFound, SiteSearch } from 'components';
import { Status } from 'constants/enums';
import React, { useEffect, useState } from 'react';
import { getCategories } from 'store/categories/categories.actions.ts';
import {useNavigate, useSearchParams} from 'react-router-dom';

const CategoriesList: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const dispatch = useAppDispatch();
    const { status, items, totalItems } = useAppSelector((state) => state.category);
    const navigate = useNavigate();
    const [search , setSearch] = useState<string>('');
    const [searchValue , setSearchValue] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(4);

    useEffect(() => {
        dispatch(getCategories({ page, pageSize, search }));
        navigate(`/categories${page > 1 ? `?page=${page}` : ''}`);
    }, [page, search, pageSize, dispatch, navigate]);

    const handleSearch = (value : string) => {
        if (value !== search){
            setSearch(value);
        }
    };

    const handleClearSearch = ()=> {
        setSearch('');
        setSearchValue('');
        setPage(1);
    };

    if (status === Status.ERROR) {
        return <ServerError />;
    }

    return (
        <Row gutter={16}>
            <Divider orientation="left">
                <Flex align="center" gap="20px">
                    КАТЕГОРІЇ
                    <SiteSearch
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                        handleClearSearch={handleClearSearch}
                    />
                </Flex>
            </Divider>

            {items.length === 0 && status === Status.LOADING ? (
                Array.from({ length: pageSize }).map((_, index) => <SkeletonCategoryCard key={index} />)
            ) : null}

            {items.length === 0 && status === Status.SUCCESS ? (
                <ItemsNotFound />
            ) : (
                items.map((item) => <CategoryCard key={item.id} {...item} />)
            )}

            <SitePagination page={page} pageSize={pageSize} totalItems={totalItems} setPage={setPage} setPageSize={setPageSize} />
        </Row>
    );
};

export default CategoriesList;
