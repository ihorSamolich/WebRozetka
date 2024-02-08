import {ICategoriesData, ICategoryCreate, ICategoryItem, ICategoryName, ICategoryUpdate} from 'interfaces/categories';
import {apiClient} from 'utils/api/apiClient.ts';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {IQueryParameters} from 'interfaces/IQueryParameters.ts';

const fetchCategories = async (page: number, pageSize: number, search: string): Promise<ICategoriesData> => {

    const queryParams : IQueryParameters = {
        page: page,
        pageCount: pageSize,
        query: search,
        orderBy: '',
    };

    const response = await apiClient.get('/api/categories', {
        params: queryParams,
    });

    return response.data as ICategoriesData;
};

const fetchCategoriesNames = async ()=> {
    const response
        = await apiClient.get('/api/categories/names');
    return response.data as ICategoryName[];
};

const fetchCategoryById = async (categoryId : number): Promise<ICategoryItem> => {
    const response = await apiClient.get<ICategoryItem>(`/api/categories/${categoryId}`);
    return response.data as ICategoryItem;
};


const addCategory = async (category : ICategoryCreate) =>{
    const response = await apiClient.post('/api/categories', category,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

    return response.data;
};

const updateCategory = async (category : ICategoryUpdate) => {
    const response = await apiClient.put('/api/categories', category,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    return response.data;
};

const deleteCategory = async (categoryId: number) =>{
    const response = await apiClient.delete(`/api/categories/${categoryId}`);
    return response.data;
};

export const useCategoriesData = (page: number, pageSize: number, search: string) => {
    return  useQuery<ICategoriesData, Error>(
        ['getCategories', page, pageSize, search],
        () => fetchCategories(page, pageSize, search),
        {
            staleTime: 30000,
            keepPreviousData: true,
        },
    );
};

export const useCategoriesNamesData = () => {
    return  useQuery<ICategoryName[], Error>(
        'getCategoriesNames',
        fetchCategoriesNames,
        {
            staleTime: 30000,
        },
    );
};

export const useAddCategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(addCategory, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('getCategories');
        },
    });
};

export const useCategoryData = (categoryId : number) => {
    return useQuery<ICategoryItem, Error>(
        ['getCategoryById', categoryId],
        () => fetchCategoryById(categoryId),
        {
            staleTime: 30000,
        },
    );
};

export const useUpdateCategoryData = () => {
    const queryClient = useQueryClient();
    return useMutation(updateCategory, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('getCategories');
        },
    });
};

export const useDeleteCategoryData = () => {
    const queryClient = useQueryClient();
    return  useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('getCategories');
        },
    });
};