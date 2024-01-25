import { Dispatch, SetStateAction } from 'react';

export interface ITopHeader {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    themeMode: boolean;
    setThemeMode: Dispatch<SetStateAction<boolean>>;
}

