import {useAppSelector, useCategories} from "hooks";
import {Divider, Pagination, Row} from "antd";
import {CategoryCard, SkeletonCategoryCard, ServerError} from "components";
import {Status} from "interfaces/enums";
import React from "react";

const CategoriesList : React.FC = () => {
    const status = useAppSelector((state) => state.category.status);
    const categories = useCategories();

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