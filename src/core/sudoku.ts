import { getSudoku } from 'sudoku-gen';
import { Cell } from './cell.js';
import type { Board, Coord, Difficulty, Pos } from '~/types';

/**
 * Convert a string to a board.
 * @param {string} stringPuzzle Puzzle.
 * @returns {Board}
 *
 * @example
 * ```ts
 * stringToPuzzle('41--75-----53--7--2-36-81--7-9--25-1-3--9-47--2-1-7---6587--9-----26-8--1925---47');
 * // => [[{ value: 4, permanent: true, marked: false }, { value: 1, permanent: true, marked: false }, { value: false, permanent: true, marked: false }, ...], ...]
 * ```
 */
function stringToPuzzle(stringPuzzle: string) {
    const board: Board = [];

    [...stringPuzzle].forEach((char, index) => {
        const rowIndex = index / 9 | 0;
        const colIndex = index % 9;
        const value = char !== '-' && +char as Coord;

        if (!board.at(rowIndex)) board[rowIndex] = [];

        board[rowIndex][colIndex] = new Cell({ value, permanent: !!value });
    });

    return board;
}

/**
 * Generate a sudoku puzzle and solution along with it.
 * @param {Difficulty} difficulty Difficulty of the puzzle.
 * @returns Board and solution.
 */
export function generateSudoku(difficulty: Difficulty = 'easy') {
    const { puzzle, solution: solutionString } = getSudoku(difficulty);
    const board = stringToPuzzle(puzzle);
    const solution = stringToPuzzle(solutionString);

    return { board, solution };
}

/**
 * Check if the given board is solved.
 * @param {Board} board Board to check.
 */
export function isSolved(board: Board): boolean {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++)
            // eslint-disable-next-line nonblock-statement-body-position
            if (!board[rowIndex][colIndex].value) return false;
    }

    return true;
}

/**
 * Find errors in a board.
 * @param {Board} board Board.
 * @returns Positions where invalid numbers are placed and error messages.
 */
export function findErrors(board: Board) {
    const messages: string[] = [];
    const positions: Pos[] = [];

    board.forEach((row, rowIndex) => {
        const seen = new Map<Coord, number[]>();

        row.forEach((col, colIndex) => {
            if (!col.value) return;

            if (seen.has(col.value)) {
                seen.get(col.value)!.push(colIndex);
            } else {
                seen.set(col.value, [colIndex]);
            }
        });

        seen.forEach((indices, value) => {
            if (indices.length > 1) {
                indices.forEach(colIndex => {
                    positions.push([rowIndex, colIndex] as Pos);
                });
                messages.push(`Number ${value} is repeated in row ${rowIndex + 1} in positions: ${indices.map(value => value + 1).join(', ')}`);
            }
        });
    });

    board.forEach((row, rowIndex) => {
        const seen = new Map<Coord, number[]>();

        for (let colIndex = 0; colIndex < board.length; colIndex++) {
            const cell = board[colIndex][rowIndex];

            if (!cell.value) continue;

            if (seen.has(cell.value)) {
                seen.get(cell.value)!.push(colIndex);
            } else {
                seen.set(cell.value, [colIndex]);
            }
        }

        seen.forEach((indices, value) => {
            if (indices.length > 1) {
                indices.forEach(colIndex => {
                    positions.push([colIndex, rowIndex] as Pos);
                });
                messages.push(`Number ${value} is repeated in column ${rowIndex + 1} in positions: ${indices.map(value => value + 1).join(', ')}`);
            }
        });
    });

    for (let boxRowIndex = 0; boxRowIndex < 9; boxRowIndex += 3) {
        for (let boxColIndex = 0; boxColIndex < 9; boxColIndex += 3) {
            const seen = new Map<Coord, Pos[]>();

            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                for (let colIndex = 0; colIndex < 3; colIndex++) {
                    const cell = board[rowIndex + boxRowIndex][colIndex + boxColIndex];

                    if (!cell.value) continue;

                    if (seen.has(cell.value)) {
                        seen.get(cell.value)!.push([rowIndex + boxRowIndex, colIndex + boxColIndex] as Pos);
                    } else {
                        seen.set(cell.value, [[rowIndex + boxRowIndex, colIndex + boxColIndex] as Pos]);
                    }
                }
            }

            seen.forEach((indices, value) => {
                if (indices.length > 1) {
                    indices.forEach(pos => {
                        positions.push(pos);
                    });
                    messages.push(`Number ${value} is repeated a box ${indices.length} times. ${indices}`);
                }
            });
        }
    }

    return { messages, positions };
}