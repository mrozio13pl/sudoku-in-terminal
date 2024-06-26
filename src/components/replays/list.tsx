import React, { useEffect } from 'react';
import { Box, Text, useStdout } from 'ink';
import terminalSize from 'terminal-size';
import { useTheme } from '~/hooks/use-theme';
import { unicodeFallback } from '~/helpers/unicode-fallback';
import { useReplays } from '~/hooks/use-replays';
import { isInRange } from '~/utils';

const MAX_WIDTH = 40;

export function ReplayList() {
    const { currentReplayIndex, currentPage, replays, pages, pageSize, setCurrentPage, setPages, setPageSize } = useReplays();
    const { theme } = useTheme();
    const { stdout } = useStdout();

    useEffect(() => {
        const maxHeight = terminalSize().rows - 5;
        setPageSize(maxHeight);
        setPages(Math.ceil(replays.length / maxHeight));
    }, [replays.length, setPages, pageSize, setPageSize]);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(terminalSize().rows - 5);
        };

        stdout.on('resize', handleResize);

        return () => {
            stdout.off('resize', handleResize);
        };
    }, [setPageSize, stdout]);

    useEffect(() => {
        if (pages < currentPage) setCurrentPage(pages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize]);

    return (
        <Box flexDirection='column'>
            {replays.map(({ difficulty, startTime }, replayIndex) => {
                const isVisible = isInRange(replayIndex, (currentPage - 1) * pageSize, currentPage * pageSize - 1);

                if (!isVisible) return <React.Fragment key={replayIndex} />;

                const isSelected = replayIndex === currentReplayIndex;
                const color = !isSelected ? theme.replays.primary : theme.replays.secondary;

                return (
                    <Box key={replayIndex}>
                        <Text color={color}>{isSelected ? unicodeFallback('❯', '>') : ' '}</Text>
                        <Box paddingLeft={1} minWidth={Math.min(MAX_WIDTH, terminalSize().columns / 3)} justifyContent='space-between'>
                            <Box>
                                <Text color={color} underline={isSelected}>{new Date(startTime).toLocaleString()}</Text>
                            </Box>
                            <Box>
                                <Text color={color} underline={isSelected}>{difficulty.toUpperCase()}</Text>
                            </Box>
                        </Box>
                    </Box>
                );
            })}

            <Box gap={2}>
                <Text color={theme.replays.primary}>Pages: <Text color={theme.replays.secondary}>{currentPage}/{pages}</Text></Text>
                <Text color={theme.replays.primary}>Replays: <Text color={theme.replays.secondary}>{replays.length}</Text></Text>
            </Box>
        </Box>
    );
}