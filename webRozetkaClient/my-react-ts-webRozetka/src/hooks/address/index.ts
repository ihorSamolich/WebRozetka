import {useQuery} from 'react-query';
import {apiClient} from 'utils/api/apiClient.ts';
import {IAddressArea, IAddressSettlement, IAddressWarehouse} from 'interfaces/address';

export const fetchSettlementsOptions = async (areaRef: string, search: string)=> {
    if (areaRef && search) {
        const response
            = await apiClient.get(`/api/address/settlements?areaRef=${areaRef}${search ? `&search=${search}`:''}`);
        return response.data.map((settlement : IAddressSettlement) => ({
            value: settlement.ref, label: settlement.description,
        }));
    }
    else {
        return [];
    }
};

export const fetchWarehousesOptions = async (settlementRef: string, search: string)=> {
    if (settlementRef && search) {
        const response
            = await apiClient.get(`/api/address/warehouses?settlementRef=${settlementRef}${search ? `&search=${search}`:''}`);
        return response.data.map((warehouse : IAddressWarehouse) => ({
            value: warehouse.ref, label: warehouse.description,
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
