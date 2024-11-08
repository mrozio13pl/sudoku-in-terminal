import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import { useTheme } from '~/hooks/use-theme';

const CHARACTERS = ['-', '_'] as const;
const TIMEOUT = 700;

export function Empty() {
    const [charIndex, setCharIndex] = useState(0);
    const { animationsEnabled } = useTheme();

    useEffect(() => {
        if (!animationsEnabled) {
            setCharIndex(0);
            return;
        }

        const timeout = setTimeout(() => {
            const newIndex = (charIndex + 1) <= (CHARACTERS.length - 1) ? charIndex + 1 : 0;
            setCharIndex(newIndex);
        }, TIMEOUT);

        return () => {
            clearTimeout(timeout);
        };
    }, [animationsEnabled, charIndex]);

    return (
        <Text>{CHARACTERS[charIndex]}</Text>
    );
}