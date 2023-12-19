export interface IUser{
    name: string,
    email: string,
}
export interface ILogin {
    username: string,
    password: string,
}

export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
}

export interface IRegistration {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    imageBase64: string,
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}

export interface IRegistrationForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    image: IUploadedFile,
}