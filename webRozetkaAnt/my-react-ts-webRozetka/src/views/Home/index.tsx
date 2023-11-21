import React from 'react';
import {Button, Card, Divider, Flex, Row, Spin, Typography} from "antd";
import { GithubOutlined} from '@ant-design/icons';

const Home: React.FC = () => {
    return(
        <Row gutter={16} >
            <Divider orientation="left">ГОЛОВНА</Divider>
            <Card style={{width: '100%'}}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    WebRozetka Home
                </Typography.Title>

                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    <img src="https://habrastorage.org/getpro/habr/upload_files/d4f/a46/db5/d4fa46db5c8dd0bdf0457900653dc1c7.jpeg" alt="React.js" style={{ maxHeight: '5em' }}></img>
                    <img src="https://uploads-ssl.webflow.com/602a49b4c90708f6641a192e/62aaec4339a8f3b14347736a_123_ant-design.259fccdbe1.png" alt="Ant Design" style={{ maxHeight: '5em' }}></img>
                </Typography.Title>


                <Typography.Title level={2} style={{ textAlign: 'center' }}>

                    <Button
                        size="large"
                        type="primary"
                        //onClick={() => window.open("", '_blank')}
                        icon={<GithubOutlined />}
                    >
                        Clone it from Github
                    </Button>
                </Typography.Title>
                <Flex style={{margin:50}} gap="small" align={'center'} justify={"center"}>
                    <Spin size="large">
                        <div className="content" />
                    </Spin>
                </Flex>
            </Card>
        </Row>
    )
};

export default Home;