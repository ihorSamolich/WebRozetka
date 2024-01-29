import {Image, Card, InputNumber, Typography, Flex, Badge, Row, Col} from 'antd';
import React, {useEffect, useState} from 'react';
import Meta from 'antd/es/card/Meta';
import {APP_ENV} from 'env/index.ts';
import {DeleteOutlined} from '@ant-design/icons';
import {IBasketProduct} from 'interfaces/basket';
import {useAppDispatch} from 'hooks/redux';
import {addToBasket, removeFromBasket} from 'store/basket/basket.actions.ts';
import {useDebouncedCallback} from 'use-debounce';

const {Text,Title} = Typography;

const BasketCard : React.FC<IBasketProduct> = (props) => {
    const dispatch = useAppDispatch();
    const {productId, count, quantity, photos, price, productName} = props;
    const [countValue, setCountValue] = useState<number | null>(count);

    useEffect(() => {
        setCountValue(count);
    }, [count]);


    const debounced = useDebouncedCallback(
        (value: number | null) => {
            if (value !== null) {
                dispatch(addToBasket({ productId: productId, count: (value - count)}));
            }
        },
        700,
    );

    const handleCountChange = (value: number | null) => {
        setCountValue(value);
        debounced(value);
    };

    const removeProduct = () => {
        dispatch(removeFromBasket(productId));
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
                                    src={`${APP_ENV.BASE_URL}images/${photos[0]}`}/>
                            </Flex>
                        }
                    title={<Text strong>{productName}</Text>}
                    description=
                        {
                            <Row>
                                <Col span={12}>
                                    <InputNumber
                                        addonAfter={'шт'}
                                        min={1}
                                        max={quantity}
                                        value={countValue}
                                        onChange={handleCountChange}
                                        defaultValue={1}
                                    />

                                </Col>
                                <Col span={12}
                                    style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <Title
                                        style={{margin: 0}}
                                        level={5}
                                        type="success">{(price * count).toFixed(2)} грн
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