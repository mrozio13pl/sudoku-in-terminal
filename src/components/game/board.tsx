/* eslint-disable unicorn/no-nested-ternary */
import React from 'react';
import { Box, Text } from 'ink';
import { useSudoku } from '~/hooks/use-sudoku';
import { useTheme } from '~/hooks/use-theme';
import { Empty } from './empty.js';
import { State } from '~/constants';
import type { Board, Color } from '~/types';

const createLine = (left: string, middle: string, right: string) => {
    let line = left;
    for (let i = 0; i < 3; i++) {
        line += '───────';
        line += (i < 2) ? middle : right;
    }
    return line;
};

const topLine = createLine('┌', '┬', '┐');
const middleLine = createLine('├', '┼', '┤');
const bottomLine = createLine('└', '┴', '┘');

export function Board() {
    const { board, pos, showHints, errors: { positions: errorPositions }, state } = useSudoku();
    const { theme } = useTheme();

    if (!board) return <Text>No board.</Text>;

    return (
        <Box flexDirection='column'>
            <Text color={theme.board.border}>{topLine}</Text>

            {board.map((row, rowIndex) => {
                return (
                    <React.Fragment key={rowIndex}>
                        <Text>
                            <Text color={theme.board.border}>│</Text> {row.map((cell, colIndex) => {
                                const isSelected = pos[0] === rowIndex && pos[1] === colIndex;
                                const color: Color = isSelected && cell.marked
                                    ? theme.board.marked
                                    : (
                                        (state !== State.SOLVED && state !== State.BOT_SOLVED) && showHints && errorPositions.findIndex(pos => pos[0] === rowIndex && pos[1] === colIndex) !== -1
                                            ? theme.board.invalid :  cell.permanent
                                                ? theme.board.permanent : state === State.SOLVED || state === State.BOT_SOLVED
                                                    ? theme.board.solved : (
                                                        isSelected
                                                            ? 'black'
                                                            : theme.board.value
                                                    )
                                    );
                                const backgroundColor: Color = isSelected
                                    ? theme.board.selected
                                    : (
                                        cell.marked
                                            ? theme.board.marked
                                            : ''
                                    );

                                return (
                                    <React.Fragment key={colIndex}>
                                        <Text
                                            backgroundColor={backgroundColor}
                                            color={color}
                                            bold={cell.permanent}
                                        >
                                            {cell.value || <Empty />}
                                        </Text>

                                        {(colIndex + 1) % 3 === 0 ? <Text color={theme.board.border}> | </Text> : ' '}
                                    </React.Fragment>
                                );
                            })}
                        </Text>

                        {(rowIndex + 1) % 3 === 0 && rowIndex !== board.length - 1 && <Text color={theme.board.border}>{middleLine}</Text>}

                        {rowIndex === board.length - 1 && <Text color={theme.board.border}>{bottomLine}</Text>}
                    </React.Fragment>
                );
            })}
        </Box>
    );
}