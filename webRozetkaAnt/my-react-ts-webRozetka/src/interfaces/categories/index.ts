import {Status} from 'interfaces/enums';

export interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface ICategoryCreate {
    name: string;
    image: File | null;
    description: string;
}

export interface ICategoryState {
    items: ICategoryItem[],
    error: object | null,
    status: Status;
}
