import { hacker } from './hacker';
import { light } from './light-theme';
import type { Theme } from '~/types';
import type { RequiredDeep } from 'type-fest';

export const themes: RequiredDeep<Theme>[] = [
    hacker, light
];