import {useQuery} from 'react-query';
import {apiClient} from 'utils/api/apiClient.ts';
import {IAddressArea, IAddressSettlement, IAddressWarehouse} from 'interfaces/address';

export const fetchSettlementsOptions = async (areaId: number | null, search: string)=> {
    if (areaId && search) {
        const response
            = await apiClient.get(`/api/address/settlements?areaId=${areaId}${search ? `&search=${search}`:''}`);
        return response.data.map((settlement : IAddressSettlement) => ({
            value: settlement.id, label: settlement.description,
        }));
    }
    else {
        return [];
    }
};

export const fetchWarehousesOptions = async (settlementId: number | null, search: string)=> {
    if (settlementId && search) {
        const response
            = await apiClient.get(`/api/address/warehouses?settlementId=${settlementId}${search ? `&search=${search}`:''}`);
        return response.data.map((warehouse : IAddressWarehouse) => ({
            value: warehouse.id, label: warehouse.description,
        }));
    }
    else {
        return [];
    }
};

const fetchAreas = async ()=> {
    const response
        = await apiClient.get('/api/address/areas');
    return response.data as IAddressArea[];
};

const fetchSettlements = async (areaRef: string, search: string)=> {
    if (areaRef) {

        const response
            = await apiClient.get(`/api/address/settlements?areaRef=${areaRef}${search ? `&search=${search}`:''}`);
        return response.data as IAddressSettlement[];
    }
    else {
        return [];
    }
};

const fetchWarehouses = async (settlementRef: string)=> {
    if (settlementRef) {
        const response
            = await apiClient.get(`/api/address/warehouses/${settlementRef}`);
        return response.data as IAddressWarehouse[];
    }
    else
    {
        return [];
    }
};

export const fetchWarehousesDetail = async (warehouseId: number)=> {
    if (warehouseId) {
        const response
            = await apiClient.get(`/api/address/warehouse-detail?warehouseId=${warehouseId}`);
        return response.data as IAddressWarehouse;
    }
    else {
        return null;
    }

};

export const useAreas = () => {
    return  useQuery<IAddressArea[], Error>(
        'getAreas',
        fetchAreas,
        {
            staleTime: 30000,
        },
    );
};

export const useSettlements = (areaRef: string, search: string) => {
    return  useQuery<IAddressSettlement[], Error>(
        ['getSettlements', areaRef, search],
        () => fetchSettlements(areaRef, search),
        {
            staleTime: 30000,
        },
    );
};

export const useWarehouses = (settlementRef: string) => {
    return  useQuery<IAddressWarehouse[], Error>(
        ['getWarehouses', settlementRef],
        () => fetchWarehouses(settlementRef),
        {
            staleTime: 30000,
        },
    );
};

export const useWarehousesDetail = (warehouseId: number) => {
    return  useQuery<IAddressWarehouse | null, Error>(
        ['getWarehousesDetail', warehouseId],
        () => fetchWarehousesDetail(warehouseId),
        {
            staleTime: 30000,
        },
    );
};