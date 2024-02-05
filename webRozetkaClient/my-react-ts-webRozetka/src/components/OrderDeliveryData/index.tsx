import React, {useEffect, useState} from 'react';
import {Button, Form, Row, Select} from 'antd';
import {
    fetchSettlementsOptions, fetchWarehousesDetail,
    fetchWarehousesOptions,
    useAreas,
    useWarehouses,
    useWarehousesDetail,
} from 'hooks/address';
import {IOrderDelivery} from 'interfaces/order';
import DebounceSelect from 'components/DebounceSelect';
import { EnvironmentOutlined } from '@ant-design/icons';
import ModalMap from 'components/ModalMap';
import {IAddressWarehouse} from 'interfaces/address';

interface IOrderDeliveryDataProps {
    updateFormData: (stepName: string, values: IOrderDelivery) => void;
    next: () => void;
}

const OrderDeliveryData: React.FC<IOrderDeliveryDataProps> = ({ updateFormData, next }) => {
    const [area, setArea] = useState<number | null>(null);
    const [settlement, setSettlement] = useState<number| null>(null);
    const [warehouse, setWarehouse] = useState<number| null>(null);
    const [warehouseDetail, setWarehouseDetail] = useState<IAddressWarehouse | null>(null);
    const { data: areas } = useAreas();
    const [openMap, setOpenMap] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            if (warehouse) {
                const res = await fetchWarehousesDetail(warehouse);

                console.log('res');
                console.log(res);

                setWarehouseDetail(res);
            }
        };

        fetchData();
    }, [warehouse]);



    const handleToggleMap = () => {
        setOpenMap(prev => !prev);
    };

    const handleChangeArea = (value: number) => {
        setArea(value);
    };

    const handleChangeSettlement = (value : number) => {
        setSettlement(value);
    };

    const handleChangeWarehouse = (value: number) => {
        setWarehouse(value);
    };

    const handleFinishDeliveryData = (values : IOrderDelivery) =>{

        console.log({...values});

        updateFormData('delivery', {...values});
        next();
    };

    return (
        <Form
            name="delivery"
            layout="vertical"
            onFinish={handleFinishDeliveryData}
        >
            <Form.Item name={'areaId'} label="Ваше область" rules={[{ required: true }]}>
                <Select
                    showSearch
                    value={area}

                    style={{ width: '100%' }}
                    placeholder="Оберіть область..."
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    onChange={handleChangeArea}
                    options={areas?.map((area) => {
                        return { value: area.id, label: area.description };
                    })}
                />
            </Form.Item>

            <Form.Item name={'settlementId'} label="Ваше місто" rules={[{ required: true }]}>
                <DebounceSelect
                    showSearch
                    value={settlement}
                    placeholder="Введіть місто..."
                    fetchOptions={(search: string) => fetchSettlementsOptions(area, search)}
                    onChange={handleChangeSettlement}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>


            <Form.Item name={'warehouseId'} label="Номер відділення" rules={[{ required: true }]}>
                <DebounceSelect
                    showSearch
                    value={warehouse}
                    placeholder="Введіть відділення або адресу..."
                    fetchOptions={(search: string) => fetchWarehousesOptions(settlement, search)}
                    onChange={handleChangeWarehouse}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Row>
                {
                    warehouse && <Button icon={<EnvironmentOutlined/>} type="link" onClick={handleToggleMap}>
                        {openMap ? 'Згорнути карту' : 'Показати на карті'}
                    </Button>
                }

                { openMap && <ModalMap warehouse = {warehouseDetail}/>}
            </Row>

            <Button type="primary" htmlType="submit">
                Далі
            </Button>

            {}
        </Form>
    );
};

export default OrderDeliveryData;
