import React from 'react';
import {Collapse, CollapseProps, Divider} from "antd";

const collapsedItem: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Швидка доставка товарів по всій України!',
        children: <p>Швидка доставка товарів по всій України!</p>,
    },
    {
        key: '2',
        label: 'Першокласна продукція від відомих брендів',
        children: <p>Першокласна продукція від відомих брендів</p>,
    },
    {
        key: '3',
        label: 'Високоякісне обслуговування кожного клієнта',
        children: <p>Високоякісне обслуговування кожного клієнта</p>,
    },
];
const CompanyInformation : React.FC = () => {
    return (
        <>
            <Divider orientation={"left"}>ПРО НАС</Divider>
            <Collapse style={{marginTop: 20}} accordion items={collapsedItem} />
        </>

    );
};

export default CompanyInformation;