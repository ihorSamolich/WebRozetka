import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

interface IServerErrorProps{
    error: string | undefined,
}

const ServerError: React.FC<IServerErrorProps> = (props) => {
    return (
        <Result
            title="Помилка сервера"
            subTitle={props.error}
            status={500}
            extra={
                <Button type="primary">
                    <Link to="/">На головну</Link>
                </Button>
            }
        />
    );
};

export default ServerError;