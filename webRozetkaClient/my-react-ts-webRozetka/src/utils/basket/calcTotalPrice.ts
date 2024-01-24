import {IBasketItem} from 'interfaces/basket';

export const calcTotalPrice = (items: IBasketItem[]) => {
    return items.reduce((sum, item) => item.product.price * item.count + sum, 0);
};