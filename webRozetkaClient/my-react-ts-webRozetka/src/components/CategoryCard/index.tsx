import React from 'react';
import {Card, Col, Popconfirm, Image, Typography, Button, Flex} from 'antd';
import Meta from 'antd/es/card/Meta';
import {ICategoryItem} from 'interfaces/categories';
import { EditOutlined,  DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import NotImage from 'assets/imagenot.png';
import {APP_ENV} from 'env';
import {deleteCategory} from 'store/categories/categories.actions.ts';
import {useAppDispatch} from 'hooks';
import {Link} from 'react-router-dom';

const CategoryCard : React.FC<ICategoryItem> = (props) => {
    const dispatch = useAppDispatch();
    const {id, name, image, description} = props;

    const handleDeleteCategory = async () => {
        await dispatch((deleteCategory(id)));
    };

    return (
        <Col style={{padding: 10}} key={id} xxl={4} xl={6} lg={8} md={12} sm={24}>
            <Card
                bodyStyle={{flex:'1'}}
                style={{height: 365, display: 'flex', flexDirection: 'column'}}
                hoverable
                cover={
                    <Image
                        preview={false}
                        style={{height: '200px', objectFit: 'cover'}}
                        alt={name}
                        src={image ? `${APP_ENV.BASE_URL}images/${image}` : NotImage}
                    />
                }
                actions={[
                    <Flex justify={'space-around'}>
                        <Popconfirm
                            title="Видалення категорії"
                            description="Підтвердити видалення категорії?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            cancelText="Ні"
                            okText="Так"
                            onConfirm={handleDeleteCategory}
                        >
                            <Button type="link" danger icon={<DeleteOutlined />} />
                        </Popconfirm>

                        <Link style={{width: 'auto'}} to={`/categories/products-category/${id}`}>
                            <Button type="primary" >
                                Переглянути товари
                            </Button>
                        </Link>

                        <Link style={{width: 'auto'}} to={`/categories/edit/${id}`}>
                            <Button type="link" icon={<EditOutlined />} />
                        </Link>
                    </Flex>,
                ]}
            >
                <Meta
                    title={
                        <Typography style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {name}
                        </Typography>
                    }
                    description={
                        <Typography style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}>
                            {description}
                        </Typography>
                    }
                />
            </Card>
        </Col>
    );
};

export default CategoryCard;