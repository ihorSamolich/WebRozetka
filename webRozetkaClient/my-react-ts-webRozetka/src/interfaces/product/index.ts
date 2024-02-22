import {Status} from 'utils/enums';

export interface IProductData {
    items: IProductItem[],
    count: number,
}
export interface IProductState {
    items: IProductItem[],
    totalItems: number,
    selectedItem: IProductItem | null,
    error: unknown | null,
    status: Status,
}

export interface IProductItem {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    country: string | null,
    manufacturer: string | null,
    quantity: number,
    discount: number,
    photos: string[],
    categoryId: number,
}

export interface IProductEditPhoto{
    photo: string | undefined,
    priority: number,
}

export interface IProductEdit {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    country: string | null,
    manufacturer: string | null,
    quantity: number,
    discount: number,
    newPhotos: IProductEditPhoto[] | null,
    oldPhotos: IProductEditPhoto[] | null,
    categoryId: number,
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