import { createTheme } from './create-theme';

export const hacker = createTheme({
    name: 'Hacker (default)',
    primary: '#00aa00',
    secondary: '#00cf00',
    border: 'white',
    warn: '#ffae00',
    error: 'red',
    settings: {
        primary: 'white',
        secondary: 'gray',
    },
    updater: {
        primary: '#23d8de',
        secondary: '#1daeb3'
    },
    prompt: {
        question: 'yellow',
        value: 'white'
    }
});