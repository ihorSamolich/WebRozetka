import {Image, Card, InputNumber, Typography, Flex, Badge, Row, Col} from 'antd';
import React from 'react';
import Meta from 'antd/es/card/Meta';
import {APP_ENV} from 'env/index.ts';
import {DeleteOutlined} from '@ant-design/icons';
import {IBasketItem} from 'interfaces/basket';
import {useAppDispatch} from 'hooks/redux';
import {removeFromBasket, changeBasketCount} from 'store/basket/basket.slice.ts';

const {Text,Title} = Typography;

const BasketCard : React.FC<IBasketItem> = (props) => {
    const dispatch = useAppDispatch();
    const {count, product} = props;

    const removeProduct = () => {
        dispatch(removeFromBasket(product.id));
    };

    const changeProductCount = (value : number | null) => {
        if (value){
            dispatch(changeBasketCount({ productId: product.id, newCount: value }));
        }
    };

    return (
        <Badge.Ribbon
            text={
                <DeleteOutlined
                    onClick={removeProduct}
                    style={{padding: 5}}
                />
            }
            color="red"
            style={{cursor: 'pointer', padding: '0'}}
        >
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
                                <Col span={12}>
                                    <InputNumber
                                        addonAfter={'шт'}
                                        min={1}
                                        max={product.quantity}
                                        value={count}
                                        onChange={changeProductCount}
                                        defaultValue={1}
                                    />

                                </Col>
                                <Col span={12}
                                    style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <Title
                                        style={{margin: 0}}
                                        level={5}
                                        type="success">{(product.price * count).toFixed(2)} грн
                                    </Title>
                                </Col>
                            </Row>
                        }
                />
            </Card>
        </Badge.Ribbon>
    );
};

export default BasketCard;