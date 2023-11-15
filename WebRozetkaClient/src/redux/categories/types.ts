export type Category = {
    id: number;
    name: string;
    image: string;
    description: string;
    isDeleted: boolean;
    dataCreated: string;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}
