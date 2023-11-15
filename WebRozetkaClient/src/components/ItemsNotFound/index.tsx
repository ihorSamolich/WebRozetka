import React from "react";
import {Alert, AlertTitle } from "@mui/material";
import {Link} from "react-router-dom";

const ItemsNotFound : React.FC = () => {
    return (
        <Alert sx={{marginTop: 2}} severity="warning">
            <AlertTitle>Записів не знайдено!</AlertTitle>
            {`Повернутися до головного меню,  `}
            <Link to='/'>
                натисніть тут!
            </Link>
        </Alert>

    );
}

export default ItemsNotFound;