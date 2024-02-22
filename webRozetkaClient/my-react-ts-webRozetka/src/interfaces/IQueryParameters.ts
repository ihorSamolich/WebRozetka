export interface IQueryParameters{
    page: number,
    pageCount: number,
    query?: string,
    categoryId?: number,
    priceMin?: number,
    priceMax?: number,
    quantityMin?: number,
    quantityMax?: number,

}


export interface IFilterParams{
    query?: string,
    price?: number[],
    categoryId?: number,
    quantity?: number[],
}