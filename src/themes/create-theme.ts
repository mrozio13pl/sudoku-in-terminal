/* eslint-disable unicorn/consistent-destructuring */
import type { Theme } from '~/types';
import type { RequiredDeep } from 'type-fest';

export function createTheme(theme: Theme) {
    const { primary, secondary, border, error } = theme;

    theme.nameColor ??= primary;

    theme.board = {
        value: 'white',
        border: border,
        empty: 'white',
        permanent: 'gray',
        marked: 'yellow',
        selected: 'black',
        invalid: error,
        solved: 'greenBright',
        ...theme.board
    };

    theme.replays = {
        primary: primary,
        secondary: secondary,
        ...theme.replays
    };

    theme.settings = {
        primary: primary,
        secondary: secondary,
        toggleOn: 'green',
        toggleOff: 'red',
        toggleEmpty: 'gray',
        ...theme.settings
    };

    theme.updater = {
        primary: primary,
        secondary: secondary,
        ...theme.updater
    };

    theme.prompt = {
        border: border,
        question: primary,
        value: secondary,
        ...theme.prompt
    };

    return Object.freeze(theme) as RequiredDeep<Theme>;
}