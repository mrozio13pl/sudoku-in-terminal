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