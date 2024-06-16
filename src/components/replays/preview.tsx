import React from 'react';
import { Box, Text } from 'ink';
import { useTheme } from '~/hooks/use-theme';
import { prettyTime } from '~/utils';
import type { Game } from '~/types';

export function ReplayPreview({ replay }: {
    readonly replay?: Game
}) {
    const { theme } = useTheme();

    if (!replay) return <></>;

    return (
        <Box flexDirection='column'>
            <Text color={theme.replays.primary}>Final time: <Text color={theme.replays.secondary}>{prettyTime(replay.finalTime)}</Text></Text>
            <Text color={theme.replays.primary}>Difficulty: <Text color={theme.replays.secondary}>{replay.difficulty.toUpperCase()}</Text></Text>
        </Box>
    );
}