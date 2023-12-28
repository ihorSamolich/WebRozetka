import React from 'react';
import {Pagination, Row} from "antd";

interface ISitePaginationProps {
    page: number,
    pageSize: number,
    totalItems: number,
    setPage: (pageNumber: number) => void;
}
const SitePagination : React.FC<ISitePaginationProps> = (props) => {

    const {page, pageSize,totalItems,setPage} = props;

    const handlePageChange = (page: number) => {
        console.log('handlePageChange')
        setPage(page);
    };

    return (
        <Row style={{width: '100%' ,display: "flex", justifyContent: 'center'}}>
            <Pagination
                current={page}
                defaultPageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
            />
        </Row>
    );
};

export default SitePagination;