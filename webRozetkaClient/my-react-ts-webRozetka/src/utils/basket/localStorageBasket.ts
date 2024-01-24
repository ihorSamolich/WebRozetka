import {IBasketState} from 'interfaces/basket';

export const addLocalStorage = (keyStorage: string, value: IBasketState): void => {
    localStorage.setItem(keyStorage, JSON.stringify(value));
};

export const deleteLocalStorage = (keyStorage: string): void => {
    localStorage.removeItem(keyStorage);
};

export const getLocalStorage = (keyStorage: string): IBasketState => {
    const storedValue = localStorage.getItem(keyStorage);

    if (storedValue !== null) {
        return JSON.parse(storedValue);
    }
    return {
        items: [],
        allPriceProducts: 0,
    };
};