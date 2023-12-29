import {useEffect, useState} from "react";

export const useLocalStorageHook = (key: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        const jsonVal = localStorage.getItem(key);

        if (jsonVal !== null) {
            try {
                return JSON.parse(jsonVal);
            } catch (error) {
                console.error('Error parsing JSON from localStorage:', error);
                return undefined;
            }
        }

        return undefined;
    });

    const setValue = (newValue) => {
        try {
            const valueToStore = JSON.stringify(newValue);
            localStorage.setItem(key, valueToStore);
            setStoredValue(newValue);
        } catch (error) {
            console.error('Error serializing value to JSON and storing in localStorage:', error);
        }
    };

    return [storedValue, setValue];
};
