import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { useReplays } from '~/hooks/use-replays';
import { ReplayPreview } from './preview';
import { useSudoku } from '~/hooks/use-sudoku';
import { Board } from '../game/board';
import { handleAction } from '~/handlers/action';
import { ReplayList } from './list';
import { COLORS } from '~/constants';

export function Replays() {
    const { currentReplayIndex, replays } = useReplays();
    const { setBoard, setPos } = useSudoku();
    const [actionIndex, setActionIndex] = useState(0);

    useEffect(() => {
        const currentReplay = replays[currentReplayIndex];

        if (!currentReplay) return;

        setBoard(currentReplay.board);
        setActionIndex(0);
        setPos([0, 0]);
    }, [currentReplayIndex, replays, setBoard, setPos]);

    useEffect(() => {
        const currentReplay = replays[currentReplayIndex];

        if (!currentReplay) return;

        const timeout = setTimeout(() => {
            if (actionIndex > currentReplay.actions.length - 1) return;

            setActionIndex(prev => prev + 1);
            handleAction(
                currentReplay.actions[actionIndex].type,
                (currentReplay.actions[actionIndex] as any).value,
                void 0,
                false
            );
        }, 50);

        return () => {
            clearTimeout(timeout);
        };
    }, [actionIndex, currentReplayIndex, replays, setBoard]);

    if (!replays.length) return (
        <Text>No replays saved.</Text>
    );

    return (
        <Box paddingLeft={2} paddingTop={1} gap={3}>
            <Box flexDirection='column'>
                <ReplayList />

                <Box gap={1}>
                    <Text color={COLORS.primary}>
                        <Text color={COLORS.secondary}>DEL</Text> - Delete replay.
                    </Text>
                </Box>
            </Box>

            <Box flexDirection='column'>
                <Board />
                <ReplayPreview replay={replays[currentReplayIndex]} />
            </Box>
        </Box>
    );
}