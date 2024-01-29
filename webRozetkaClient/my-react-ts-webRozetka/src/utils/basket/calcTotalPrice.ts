import {IBasketProduct} from 'interfaces/basket';

export const calcTotalPrice = (items: IBasketProduct[]) => {
    return items.reduce((sum, item) => item.price * item.count + sum, 0);
};