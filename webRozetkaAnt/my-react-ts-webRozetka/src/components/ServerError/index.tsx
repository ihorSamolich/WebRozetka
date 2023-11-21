import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import React from "react";

const ServerError: React.FC = () => {
    return (
        <Result
            title="Помилка сервера"
            subTitle="Вибачте, сталася помилка на сервері."
            extra={
                <Button type="primary">
                    <Link to="/">На головну</Link>
                </Button>
            }
        />
    );
};

export default ServerError;