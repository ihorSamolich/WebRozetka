import React from 'react';
import {IBasketItem} from 'interfaces/basket';
import {Card, Col, Flex, Image, Row, Typography} from 'antd';
import Meta from 'antd/es/card/Meta';
import {APP_ENV} from 'env/index.ts';

const {Text,Title} = Typography;

const OrderCard : React.FC<IBasketItem> = (props) => {
    const {count, product} = props;

    return (
        <Card
            style={{margin: 5}}
        >
            <Meta
                avatar=
                    {
                        <Flex justify={'center'} style={{width: 50}}>
                            <Image preview={false} height={50}
                                src={`${APP_ENV.BASE_URL}images/${product.photos[0]}`}/>
                        </Flex>
                    }
                title={<Text strong>{product.name}</Text>}
                description=
                    {
                        <Row>
                            <Col span={24}
                                style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text type="secondary">{count} шт.</Text>
                                <Title
                                    style={{margin: 0}}
                                    level={5}
                                    type="success">{product.price.toFixed(2)} грн
                                </Title>
                            </Col>
                        </Row>
                    }
            />
        </Card>
    );
};

export default OrderCard;