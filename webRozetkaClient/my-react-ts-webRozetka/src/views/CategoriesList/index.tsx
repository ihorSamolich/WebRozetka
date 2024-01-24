import { Divider, Flex, Row} from 'antd';
import { CategoryCard, SkeletonCategoryCard, ServerError, SitePagination, ItemsNotFound, SiteSearch } from 'components';
import React, { useEffect, useState } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useCategoriesData} from 'hooks/categories';

const CategoriesList: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [search , setSearch] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(4);
    const navigate = useNavigate();
    const { isLoading, data: response, isError,error} = useCategoriesData(page, pageSize, search);

    useEffect(() => {
        navigate(`/categories${page > 1 ? `?page=${page}` : ''}`);
    }, [page, search, pageSize, navigate]);

    if (isError){
        return <ServerError error = {error?.message} />;
    }

    return (
        <Row gutter={16}>
            <Divider orientation="left">
                <Flex align="center" gap="20px">
                    КАТЕГОРІЇ
                    <SiteSearch search = {search} setSearch = {setSearch}/>
                </Flex>
            </Divider>

            {isLoading && (
                Array.from({ length: pageSize }).map((_, index) => <SkeletonCategoryCard key={index} />)
            )}

            {response?.items.length === 0 ? (
                <ItemsNotFound />
            ) : (
                response?.items.map((item) => <CategoryCard key={item.id} {...item} />)
            )}

            <SitePagination page={page} pageSize={pageSize} totalItems={response?.count || 0} setPage={setPage} setPageSize={setPageSize} />
        </Row>
    );
};

export default CategoriesList;
