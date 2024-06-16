import React from 'react';
import { Box, Newline, Text, type BoxProps } from 'ink';
import { Counter } from './counter.js';
import { useSudoku } from '~/hooks/use-sudoku';
import { useTheme } from '~/hooks/use-theme.js';
import { State } from '~/constants';
import { capitalize, prettyTime } from '~/utils';

export function Info() {
    const { board, difficulty, finalTime, state, showHelp } = useSudoku();
    const { theme } = useTheme();
    const boxProps = { paddingTop: 1, flexDirection: 'column' } satisfies BoxProps;

    if (showHelp) {
        return (
            <Box {...boxProps}>
                <Text color={theme.primary}>
                    <Text color={theme.secondary}>N</Text> - start a new puzzle.
                    <Newline />
                    <Text color={theme.secondary}>C</Text> - clear the board.
                    <Newline />
                    <Text color={theme.secondary}>S</Text> - solve the puzzle.
                    <Newline />
                    <Text color={theme.secondary}>E</Text> - open settings.
                    <Newline />
                    <Text color={theme.secondary}>M</Text> - mark/unmark selected cell.
                    <Newline />
                    <Text color={theme.secondary}>U</Text> / <Text color={theme.secondary}>CTRL+Z</Text> - undo.
                    <Newline />
                    <Text color={theme.secondary}>R</Text> / <Text color={theme.secondary}>CTRL+Y</Text> - redo.
                    <Newline /><Newline />
                    <Text color={theme.primary}>Press <Text color={theme.secondary}>Q</Text> to go back.</Text>
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
            <Text color={theme.primary}>Press <Text bold color={theme.secondary}>ESCAPE</Text> to go to menu.</Text>
            <Text color={theme.primary}>Use <Text bold color={theme.secondary}>HJKL</Text> or <Text bold color={theme.secondary}>←↑↓→</Text> keys to move around.</Text>
            <Text color={theme.primary}>Numbers colored in <Text color='gray'>gray</Text> are immutable.<Newline /></Text>
            <Text color={theme.primary}>
                {
                    finalTime
                        ? <>Final time: {prettyTime(finalTime)}</>
                        : <>Time: <Counter bold={true} color={theme.secondary} /></>
                }
            </Text>
            <Text color={theme.primary}>Completed: <Text color={theme.secondary}>{completed}/{9 * 9}</Text></Text>
            <Text color={theme.primary}>Difficulty: <Text color={theme.secondary}>{capitalize(difficulty)}</Text><Newline /></Text>
            {
                state !== State.SOLVED && state !== State.BOT_SOLVED ?
                    (
                        <Text color={theme.primary}>
                            Press <Text color={theme.secondary}>Q</Text> for more help.
                        </Text>
                    ) :
                    (
                        <Text color={theme.primary}>
                            Press <Text color={theme.secondary}>ENTER</Text> to start again!
                        </Text>
                    )
            }
        </Box>
    );
}