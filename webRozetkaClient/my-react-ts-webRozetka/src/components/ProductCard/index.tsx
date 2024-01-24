import React from 'react';
import { ShoppingCartOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {Badge, Button, Card, Col} from 'antd';
import {Typography } from 'antd';
import {IProductItem} from 'interfaces/product';
import {APP_ENV} from 'env/index.ts';
import NotImage from 'assets/imagenot.png';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'hooks/reduxHooks';
import {addToBasket} from 'store/basket/basket.slice.ts';

const { Title } = Typography;
const { Meta } = Card;

const ProductCard : React.FC<IProductItem> = (props) => {
    const navigate = useNavigate();
    const {id, name, discount, price, photos, quantity} = props;
    const dispatch = useAppDispatch();

    const handleOpenProductCard = () => {
        navigate(`/product/${id}`);
    };

    const handleAddProductToBasket = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addToBasket({product: {id, name, price, photos, quantity}, count: 1}));
    };

    return (
        <Col style={{padding: 10}} xxl={3} xl={4} lg={6} md={8} sm={12}>
            <Badge.Ribbon
                text={discount > 0 ? `Знижка - ${discount} %` : 'Вигідна пропозиція!'}
                color={discount > 0 ? 'red' : 'green'}
            >
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 280, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    onClick={handleOpenProductCard}
                    cover={
                        <img
                            style={{height: '100px', objectFit: 'contain'}}
                            alt={name}
                            src={photos[0] ? `${APP_ENV.BASE_URL}images/${photos[0]}` : NotImage}
                        />
                    }
                    actions={[
                        quantity > 0 ? (
                            <Button
                                onClick={handleAddProductToBasket}
                                icon={<ShoppingCartOutlined/>} key="addToCart">
                                До кошика
                            </Button>
                        ) : (
                            <Button type="primary" icon={<ExclamationCircleOutlined/>} disabled>
                                Недоступний
                            </Button>
                        ),
                    ]}
                >
                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{price.toFixed(2)} грн</Title>
                        }
                    />
                </Card>
            </Badge.Ribbon>
        </Col>
    );
};

export default ProductCard;