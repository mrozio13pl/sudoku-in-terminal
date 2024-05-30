/* eslint-disable unicorn/no-nested-ternary */
import React from 'react';
import { Box, Text } from 'ink';
import { useSudoku } from '~/hooks/use-sudoku';
import { Empty } from './empty.js';
import { State } from '~/constants';
import type { Board, Color } from '~/types';

const createLine = (left: string, middle: string, right: string) => {
    let line = left;
    for (let i = 0; i < 3; i++) {
        line += '───────';
        line += (i < 2) ? middle : right;
    }
    return () => <Text children={line} />;
};

const TopLine = createLine('┌', '┬', '┐');
const MiddleLine = createLine('├', '┼', '┤');
const BottomLine = createLine('└', '┴', '┘');

export function Board() {
    const { board, pos, showHints, errors: { positions: errorPositions }, state } = useSudoku();

    if (!board) return <Text>No board.</Text>;

    return (
        <Box flexDirection='column'>
            <TopLine />

            {board.map((row, rowIndex) => {
                return (
                    <React.Fragment key={rowIndex}>
                        <Text>
                            {'│'} {row.map((cell, colIndex) => {
                                const isSelected = pos[0] === rowIndex && pos[1] === colIndex;
                                const color: Color = isSelected && cell.marked
                                    ? 'yellowBright'
                                    : (
                                        (state !== State.SOLVED && state !== State.BOT_SOLVED) && showHints && errorPositions.findIndex(pos => pos[0] === rowIndex && pos[1] === colIndex) !== -1
                                            ? 'red' :  cell.permanent
                                                ? 'gray' : state === State.SOLVED || state === State.BOT_SOLVED
                                                    ? 'greenBright' : (
                                                        isSelected
                                                            ? 'black'
                                                            : 'white'
                                                    )
                                    );
                                const backgroundColor: Color = isSelected
                                    ? 'whiteBright'
                                    : (
                                        cell.marked
                                            ? 'yellowBright'
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

                                        {(colIndex + 1) % 3 === 0 ? ' │ ' : ' '}
                                    </React.Fragment>
                                );
                            })}
                        </Text>

                        {(rowIndex + 1) % 3 === 0 && rowIndex !== board.length - 1 && <MiddleLine />}

                        {rowIndex === board.length - 1 && <BottomLine />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
}