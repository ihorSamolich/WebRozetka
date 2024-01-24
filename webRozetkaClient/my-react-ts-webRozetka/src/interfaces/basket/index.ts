
export interface IBasketProduct {
    id: number,
    name: string,
    price: number,
    quantity: number,
    photos: string[],
}
export interface IBasketItem {
    product: IBasketProduct,
    count: number,
}
export interface IBasketState {
    items : IBasketItem[],
    allPriceProducts: number,
}

