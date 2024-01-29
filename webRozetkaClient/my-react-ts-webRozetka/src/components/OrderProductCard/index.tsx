import React from 'react';
import {IBasketProduct} from 'interfaces/basket';
import {Card, Col, Flex, Image, Row, Typography} from 'antd';
import Meta from 'antd/es/card/Meta';
import {APP_ENV} from 'env/index.ts';

const {Text,Title} = Typography;

const OrderCard : React.FC<IBasketProduct> = (props) => {
    const {count, productName, price, photos} = props;

    return (
        <Card
            style={{margin: 5}}
        >
            <Meta
                avatar=
                    {
                        <Flex justify={'center'} style={{width: 50}}>
                            <Image preview={false} height={50}
                                src={`${APP_ENV.BASE_URL}images/${photos[0]}`}/>
                        </Flex>
                    }
                title={<Text strong>{productName}</Text>}
                description=
                    {
                        <Row>
                            <Col span={24}
                                style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text type="secondary">{count} шт.</Text>
                                <Title
                                    style={{margin: 0}}
                                    level={5}
                                    type="success">{price.toFixed(2)} грн
                                </Title>
                            </Col>
                        </Row>
                    }
            />
        </Card>
    );
};

export default OrderCard;