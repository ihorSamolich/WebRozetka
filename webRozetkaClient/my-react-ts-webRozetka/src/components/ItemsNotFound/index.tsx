import React from 'react';
import {Empty, Flex} from "antd";

const ItemsNotFound : React.FC = () => {
    return (
        <Flex style={{width: '100%'}} align={"center"} justify={"center"}>
            <Empty  description='Нічого не знайдено!' image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Flex>
    );
};

export default ItemsNotFound;