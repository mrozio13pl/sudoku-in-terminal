import React from 'react';
import { Box, Text } from 'ink';
import terminalSize from 'terminal-size';
import { Alert } from '../ui/alert.js';
import { useSudoku } from '~/hooks/use-sudoku';
import { useTheme } from '~/hooks/use-theme';
import { MINIMUM_TERMINAL_SIZE, State } from '~/constants';

export function Errors() {
    const { state, errors: { messages } } = useSudoku();
    const { theme } = useTheme();

    return (
        <Box flexDirection='column'>
            {state !== State.SOLVED && state !== State.BOT_SOLVED && messages.map((message, messageIndex) => {
                const isLast = messageIndex === message.length - 1;
                const max = terminalSize().rows - MINIMUM_TERMINAL_SIZE.rows - 1;

                if (messageIndex === max && !isLast) return <Text key={messageIndex}>...</Text>;
                if (messageIndex > max) {
                    return <React.Fragment key={messageIndex}></React.Fragment>;
                }

                return <Alert color={theme.error} label='MISTAKE' key={messageIndex}>{message}</Alert>;
            })}
        </Box>
    );
}