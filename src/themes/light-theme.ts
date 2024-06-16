import { createTheme } from './create-theme';

export const light = createTheme({
    name: 'Light Theme',
    primary: 'white',
    secondary: '#d4cbd2',
    border: 'white',
    warn: '#fff396',
    error: '#ff9696',
    board: {
        permanent: '#b3b1b2',
        marked: '#ccb4c7',
        solved: '#83ff7d',
        selected: '#d4cbd2'
    },
    settings: {
        toggleEmpty: '#d4cbd2',
        toggleOn: '#83ff7d',
        toggleOff: '#ff9696'
    }
});