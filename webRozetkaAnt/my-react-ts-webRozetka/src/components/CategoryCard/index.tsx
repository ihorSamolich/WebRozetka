import React from 'react';
import {Card, Col} from "antd";
import Meta from "antd/es/card/Meta";
import {ICategoryItem} from "interfaces/categories";
import { Image } from 'antd';
import { EditOutlined,  SettingOutlined } from '@ant-design/icons';
import NotImage from 'assets/imagenot.png';
import {API_URL} from "constants/index.ts";

const CategoryCard : React.FC<ICategoryItem> = (props) => {
    const {id, name, image, description} = props;
    return (
        <Col style={{padding: 10}} key={id} xxl={4} xl={6} lg={8} md={12} sm={24}>
            <Card
                bodyStyle={{flex:'1'}}
                style={{height: '100%', display: 'flex', flexDirection: 'column'}}
                hoverable
                cover={
                    <Image
                        style={{height: '200px', objectFit: 'cover'}}
                        alt={name}
                        src={image ? `${API_URL}images/${image}` : NotImage}
                    />
                }
                actions={[
                    <SettingOutlined key="setting"/>,
                    <EditOutlined key="edit"/>,
                ]}
            >
                <Meta
                    title={
                        <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {name}
                        </div>
                    }
                    description={
                        <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2
                        }}>
                            {description}
                        </div>
                    }
                />
            </Card>
        </Col>
    );
}

export default CategoryCard;