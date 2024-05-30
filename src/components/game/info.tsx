import React from 'react';
import { Box, Newline, Text, type BoxProps } from 'ink';
import { Counter } from './counter.js';
import { useSudoku } from '~/hooks/use-sudoku';
import { COLORS, State } from '~/constants';
import { capitalize, prettyTime } from '~/utils';

export function Info() {
    const { board, difficulty, finalTime, state, showHelp } = useSudoku();
    const boxProps = { paddingTop: 1, flexDirection: 'column' } satisfies BoxProps;

    if (showHelp) {
        return (
            <Box {...boxProps}>
                <Text color={COLORS.primary}>
                    <Text color={COLORS.secondary}>N</Text> - start a new puzzle.
                    <Newline />
                    <Text color={COLORS.secondary}>C</Text> - clear the board.
                    <Newline />
                    <Text color={COLORS.secondary}>S</Text> - solve the puzzle.
                    <Newline />
                    <Text color={COLORS.secondary}>E</Text> - open settings.
                    <Newline />
                    <Text color={COLORS.secondary}>M</Text> - mark/unmark selected cell.
                    <Newline />
                    <Text color={COLORS.secondary}>U</Text> / <Text color={COLORS.secondary}>CTRL+Z</Text> - undo.
                    <Newline />
                    <Text color={COLORS.secondary}>R</Text> / <Text color={COLORS.secondary}>CTRL+Y</Text> - redo.
                    <Newline /><Newline />
                    <Text color={COLORS.primary}>Press <Text color={COLORS.secondary}>Q</Text> to go back.</Text>
                </Text>
            </Box>
        );
    }

    let completed = 0;
    board?.forEach(row => {
        row.forEach(col => {
            if (col.value) completed++;
        });
    });

    return (
        <Box {...boxProps}>
            <Text color={COLORS.primary}>Press <Text bold color={COLORS.secondary}>ESCAPE</Text> to go to menu.</Text>
            <Text color={COLORS.primary}>Use <Text bold color={COLORS.secondary}>HJKL</Text> or <Text bold color={COLORS.secondary}>←↑↓→</Text> keys to move around.</Text>
            <Text color={COLORS.primary}>Numbers colored in <Text color='gray'>gray</Text> are immutable.<Newline /></Text>
            <Text color={COLORS.primary}>
                {
                    finalTime
                        ? <>Final time: {prettyTime(finalTime)}</>
                        : <>Time: <Counter bold={true} color={COLORS.secondary} /></>
                }
            </Text>
            <Text color={COLORS.primary}>Completed: <Text color={COLORS.secondary}>{completed}/{9 * 9}</Text></Text>
            <Text color={COLORS.primary}>Difficulty: <Text color={COLORS.secondary}>{capitalize(difficulty)}</Text><Newline /></Text>
            {
                state !== State.SOLVED && state !== State.BOT_SOLVED ?
                    (
                        <Text color={COLORS.primary}>
                            Press <Text color={COLORS.secondary}>Q</Text> for more help.
                        </Text>
                    ) :
                    (
                        <Text color={COLORS.primary}>
                            Press <Text color={COLORS.secondary}>ENTER</Text> to start again!
                        </Text>
                    )
            }
        </Box>
    );
}