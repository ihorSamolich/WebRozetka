import { createTheme, Theme } from '@mui/material/styles';

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ff004d',
        },
        background: {
            default: '#3bc2ff',
        },
    },
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#0033ff',
        },
        background: {
            default: '#283593',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(47,44,44,0.7)',
            disabled: 'rgba(117,103,103,0.5)',
        },
    },
});
