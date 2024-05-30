import React, { useEffect, useState } from 'react';
import { Text, type TextProps } from 'ink';
import { prettyTime } from '~/utils';
import { useSudoku } from '~/hooks/use-sudoku';

export function Counter({ ...props }: TextProps) {
    const { startTime } = useSudoku();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        setElapsed(0);
    }, [startTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            const newElapsed = ~~((Date.now() - startTime) / 1000);
            setElapsed(newElapsed);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [startTime]);

    return (
        <Text {...props}>{prettyTime(elapsed)}</Text>
    );
}