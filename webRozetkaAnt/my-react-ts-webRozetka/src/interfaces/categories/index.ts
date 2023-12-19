import {Status} from 'constants/enums';
import {UploadedFile} from "interfaces/account";

export interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
    dateCreated: string;
    isDeleted: boolean;
}

export interface ICategoryCreateForm {
    name: string;
    image: UploadedFile | null;
    description: string;
}
export interface ICategoryCreate {
    name: string;
    image: File | undefined;
    description: string;
}

export interface ICategoryUpdateForm {
    name: string;
    image: UploadedFile | null;
    description: string;
}
export interface ICategoryUpdate {
    name: string;
    image: File | undefined;
    description: string;
}

export interface ICategoryState {
    items: ICategoryItem[],
    error: object | null,
    status: Status;
}
