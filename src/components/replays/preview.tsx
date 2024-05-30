import React from 'react';
import { Box, Text } from 'ink';
import { prettyTime } from '~/utils';
import type { Game } from '~/types';
import { COLORS } from '~/constants';

export function ReplayPreview({ replay }: {
    readonly replay?: Game
}) {
    if (!replay) return <></>;

    return (
        <Box flexDirection='column'>
            <Text color={COLORS.primary}>Final time: <Text color={COLORS.secondary}>{prettyTime(replay.finalTime)}</Text></Text>
            <Text color={COLORS.primary}>Difficulty: <Text color={COLORS.secondary}>{replay.difficulty.toUpperCase()}</Text></Text>
        </Box>
    );
}