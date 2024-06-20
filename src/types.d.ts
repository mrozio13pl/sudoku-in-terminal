import type { Cell } from '~/core/cell';
import type { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import type { ForegroundColor } from 'ansi-styles';
import type { IntRange, LiteralUnion } from 'type-fest';

export type { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

export type Coord = IntRange<0, 9>;
/** Position on the board. */
export type Pos = [Coord, Coord];
export type Board = Cell[][];
export type Color = LiteralUnion<keyof ForegroundColor, string>;

export type Setting = {
    name: string;
    description?: string;
    type: 'boolean' | 'list';
    value: any;
    valueColors?: Color[];
    list?: any[];
    onChange?: (value: any) => void;
}

export type Option = {
    name: string;
    value: string;
}

export type ActionType =
    | 'left'
    | 'right'
    | 'down'
    | 'up'
    | 'value'
    | 'remove'
    | 'mark'
    | 'end'

export type Action =
    | { type: Exclude<ActionType, 'value' | 'remove'> }
    | { type: 'value' | 'remove', value: Coord, previousValue: Coord };

export type Game = {
    actions: Action[];
    board: Board;
    solution: Board;
    difficulty: Difficulty;
    finalTime: number;
    startTime: number;
}

export type Theme = {
    /** Theme name. */
    name: string;
    /**
     * Theme name color displayed in settings.
     * @default primary
     */
    nameColor?: Color;
    /** Primary color. */
    primary: Color;
    /** Secondary color. */
    secondary: Color;
    /** Error color. */
    error: Color;
    /** Warning color. */
    warn: Color;
    /** Border color. */
    border: Color;
    board?: Partial<{
        /** @default 'white' */
        value: Color;
        /** @default border */
        border: Color;
        /** @default 'white */
        empty: Color;
        /** @default 'gray' */
        permanent: Color;
        /** @default 'yellow' */
        marked: Color;
        /** @default 'white' */
        selected: Color;
        /** @default error */
        invalid: Color;
        /** @default 'greenBright' */
        solved: Color;
    }>
    replays?: Partial<{
        /** @default primary */
        primary: Color;
        /** @default secondary */
        secondary: Color
    }>
    settings?: Partial<{
        /** @default primary */
        primary: Color;
        /** @default secondary */
        secondary: Color;
        /** @default 'green' */
        toggleOn: Color;
        /** @default 'red */
        toggleOff: Color;
        /** @default 'gray' */
        toggleEmpty: Color;
    }>
    updater?: Partial<{
        /** @default primary */
        primary: Color;
        /** @default secondary */
        secondary: Color;
    }>
    prompt?: Partial<{
        /** @default border */
        border: Color;
        /** @default primary */
        question: Color;
        /** @default secondary */
        value: Color;
    }>
}