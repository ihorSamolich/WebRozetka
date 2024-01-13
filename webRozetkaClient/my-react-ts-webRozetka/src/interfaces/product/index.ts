import {Status} from "constants/enums";

export interface IProductState {
    items: IProductItem[],
    totalItems: number,
    selectedItem: IProductItem | null,
    error: unknown | null,
    status: Status,
}

export interface IProductItem {
    id: number,
    name: string,
    price: number,
    description: string,
    country: string | null,
    manufacturer: string | null,
    quantity: number,
    discount: number,
    photos: string[],
}

export interface IProductCreate {
    name: string,
    price: string,
    description: string,
    country: string | null,
    manufacturer: string | null,
    quantity: number,
    discount: number,
    images: File[] | null,
    categoryId: number,
}