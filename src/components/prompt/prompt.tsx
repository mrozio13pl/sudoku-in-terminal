import React from 'react';
import { Box, Text } from 'ink';
import { usePrompt } from '~/hooks/use-prompt';
import stripAnsi from 'strip-ansi';
import terminalSize from 'terminal-size';

export function Prompter() {
    const { question } = usePrompt();

    if (!question) return <></>;

    const YN = 'Y/n';

    // this contains the amount of empty spaces it should take to hide the background
    // because if we display some component on top of another
    // the other component might still be visible
    const fill = Math.min(stripAnsi(question).length, terminalSize().columns - 5) - YN.length;

    return (
        <Box
            position='absolute'
            alignItems='center'
            justifyContent='center'
            width={'100%'}
            height={'100%'}
        >
            <Box borderStyle='doubleSingle' flexDirection='column'>
                <Text color='yellow'> {question} </Text>
                <Text> {YN}{' '.repeat(fill)}</Text>
            </Box>
        </Box>
    );
}

/**
 * Create Y/n prompt.
 * @param {string} question Question.
 * @returns {boolean}
 */
export function prompt(question: string) {
    return new Promise<boolean>(resolve => {
        const handleCallback = (value: boolean) => {
            usePrompt.setState({
                question: '',
                callback: () => {}
            });
            resolve(value);
        };

        usePrompt.setState({
            question,
            callback: handleCallback
        });
    });
}