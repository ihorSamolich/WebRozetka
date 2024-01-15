import { Col,Skeleton} from 'antd';
import React from 'react';

const SkeletonCategoryCard: React.FC = () => {
    return (
        <Col style={{ padding: 10 }} xxl={4} xl={6} lg={8} md={12} xs={24}>
            <Skeleton.Button block={true} shape={'round'} active={true} style={{ minHeight: 365 }} />
        </Col>
    );
};
export default SkeletonCategoryCard;