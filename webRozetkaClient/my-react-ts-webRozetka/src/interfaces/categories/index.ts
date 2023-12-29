import {Status} from 'constants/enums';
export interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
    dateCreated: string;
    isDeleted: boolean;
}

export interface ICategoriesData {
    items: ICategoryItem[],
    count: number,
}

export interface ICategoriesPageParams {
    page: number,
    pageSize: number | null,
    search: string | null
}


export interface ICategoryCreate {
    name: string;
    image: File | undefined;
    description: string;
}

export interface ICategoryUpdate {
    name: string;
    image: File | undefined;
    description: string;
}

export interface ICategoryState {
    items: ICategoryItem[],
    totalItems: number,
    error: unknown | null,
    status: Status;
}
