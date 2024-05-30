import React, { useEffect, useState } from 'react';
import { Box, Text, useStdout, type BoxProps } from 'ink';
import terminalSize from 'terminal-size';
import InkInstance from '~/index';
import { App } from '~/app';
import { MINIMUM_TERMINAL_SIZE } from '~/constants';

export function Window({ children, ...props }: Readonly<{
    children: React.ReactNode
}> & BoxProps) {
    const size = terminalSize();
    const { stdout } = useStdout();

    const [terminalWidth, setTerminalWidth] = useState(size.columns - 1);
    const [terminalHeight, setTerminalHeight] = useState(size.rows - 1);
    const [isHeightTooSmall, setIsHeightTooSmall] = useState(terminalHeight < MINIMUM_TERMINAL_SIZE.rows);
    const [isWidthTooSmall, setIsWidthTooSmall] = useState(terminalWidth < MINIMUM_TERMINAL_SIZE.columns);

    function resize() {
        const size = terminalSize();

        // we purposefully subtract the size by one
        // due to annoying flashing effect in some terminals
        setTerminalWidth(size.columns - 1);
        setTerminalHeight(size.rows - 1);
        setIsHeightTooSmall(size.rows - 1 < MINIMUM_TERMINAL_SIZE.rows);
        setIsWidthTooSmall(size.columns - 1 < MINIMUM_TERMINAL_SIZE.columns);
        InkInstance.rerender(App());
    }

    useEffect(() => {
        stdout.on('resize', resize);

        return () => {
            stdout.off('resize', resize);
        };
    });

    return (
        <Box
            minHeight={terminalHeight}
            minWidth={terminalWidth}
            height={terminalHeight}
            width={terminalWidth}
            {...props}
        >
            {
                !isHeightTooSmall && !isWidthTooSmall
                    ? children
                    : (
                        <Box
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            width='100%'
                        >
                            <Text>Terminal size too small.</Text>

                            {terminalHeight > 3 && (
                                <>
                                    <Text>
                                    Width: <Text color={isWidthTooSmall ? 'red' : 'green'}>
                                            {terminalWidth} {isWidthTooSmall ? '<' : '≥'} {MINIMUM_TERMINAL_SIZE.columns}
                                        </Text>
                                    </Text>
                                    <Text>
                                    Height: <Text color={isHeightTooSmall ? 'red' : 'green'}>
                                            {terminalHeight} {isHeightTooSmall ? '<' : '≥'} {MINIMUM_TERMINAL_SIZE.rows}
                                        </Text>
                                    </Text>
                                </>
                            )}
                        </Box>
                    )
            }
        </Box>
    );
}