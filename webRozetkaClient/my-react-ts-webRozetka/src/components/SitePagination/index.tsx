import React from 'react';
import {Pagination, Row} from 'antd';

interface ISitePaginationProps {
    page: number,
    pageSize: number,
    totalItems: number,
    setPage: (pageNumber: number) => void,
    setPageSize: (pageNumber: number) => void,
}
const SitePagination : React.FC<ISitePaginationProps> = (props) => {
    const {page, pageSize, totalItems, setPage, setPageSize} = props;

    const handlePageChange = (page: number, newPageSize: number) => {
        if (pageSize !== newPageSize){
            setPageSize(newPageSize);
            setPage(1);
        }
        else {
            setPage(page);
        }
    };

    return (
        <Row style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Pagination
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                current={page}
                defaultPageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                pageSizeOptions={[4, 8, 12, 16]}
                showSizeChanger
            />
        </Row>
    );
};

export default SitePagination;