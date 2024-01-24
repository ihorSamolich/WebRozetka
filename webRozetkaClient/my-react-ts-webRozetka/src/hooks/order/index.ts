import {useMutation} from 'react-query';
import {apiClient} from 'utils/api/apiClient.ts';
import {IOrderData} from 'interfaces/order';


const addOrder = async (order : IOrderData) =>{
    const response
        = await apiClient.post('/api/order',order);
    return response.data;
};

export const useAddOrderData = () => {
    return useMutation(addOrder);
};
