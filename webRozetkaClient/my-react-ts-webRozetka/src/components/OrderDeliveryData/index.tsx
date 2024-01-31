import React, {useState} from 'react';
import {Button, Form, Select, SelectProps} from 'antd';
import {fetchSettlementsOptions, fetchWarehousesOptions, useAreas} from 'hooks/address';
import {IOrderDelivery} from 'interfaces/order';
import DebounceSelect from 'components/DebounceSelect';

interface IOrderDeliveryDataProps {
    updateFormData: (stepName: string, values: IOrderDelivery) => void;
    next: () => void;
}

const OrderDeliveryData: React.FC<IOrderDeliveryDataProps> = ({ updateFormData, next }) => {
    const [area, setArea] = useState<string>('');
    const [settlement, setSettlement] = useState<string>('');
    const [warehouse, setWarehouse] = useState<string>('');

    const { data: areas } = useAreas();

    const handleChangeArea = (value: string) => {
        setArea(value);
    };

    const handleChangeSettlement = (selected: SelectProps) => {
        setSettlement(selected.value);
    };

    const handleChangeWarehouse = (selected: SelectProps) => {
        setWarehouse(selected.value);
    };

    const handleFinishDeliveryData = () =>{
        updateFormData('delivery', {areaRef: area, settlementRef: settlement, warehouseRef: warehouse});
        next();
    };

    return (
        <Form
            name="delivery"
            layout="vertical"
            onFinish={handleFinishDeliveryData}
        >
            <Form.Item name={'areaRef'} label="Ваше область" rules={[{ required: true }]}>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Оберіть область..."
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    onChange={handleChangeArea}
                    options={areas?.map((area) => {
                        return { value: area.ref, label: area.description };
                    })}
                />
            </Form.Item>
            <Form.Item name={'settlementRef'} label="Ваше місто" rules={[{ required: true }]}>
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
            <Form.Item name={'warehouseRef'} label="Номер відділення" rules={[{ required: true }]}>
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

            <Button type="primary" htmlType="submit">
                Далі
            </Button>
        </Form>
    );
};

export default OrderDeliveryData;
