import React from 'react';
import {Descriptions, DescriptionsProps, Typography} from 'antd';
const { Text } = Typography;

interface IProductDescriptionsProps {
    name: string,
    description: string,
    country: string | null,
    manufacturer: string | null,
    price: number,
}
const ProductDescriptions :React.FC<IProductDescriptionsProps> = (props) => {
    const {name, description, price, country, manufacturer} = props;

    const productInfo: DescriptionsProps['items'] = [
        {
            key: 1,
            label: <Text strong>НАЙМЕНУВАННЯ ТОВАРУ</Text>,
            children: <Text strong>{name}</Text>,
        },
        {
            key: 2,
            label: <Text strong>ОПИС ТОВАРУ</Text>,
            children: <Text strong>{description}</Text>,
        },
        {
            key: 3,
            label: <Text strong>ЦІНА</Text>,
            children: <Text strong>{price.toFixed(2)} ГРН</Text>,
        },
        {
            key: 4,
            label: <Text strong>КРАЇНА ВИГОТОВЛЕННЯ</Text>,
            children: <Text strong>{country || '—'}</Text>,
        },
        {
            key: 5,
            label: <Text strong>ВИРОБНИК ТОВАРУ ТОВАРУ</Text>,
            children: <Text strong>{manufacturer || '—'}</Text>,
        },
    ];

    return (
        <Descriptions bordered layout={'vertical'}  items={productInfo} />
    );
};

export default ProductDescriptions;