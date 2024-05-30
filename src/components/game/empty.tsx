import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

const CHARACTERS = ['-', '_'] as const;
const TIMEOUT = 700;

export function Empty() {
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newIndex = (charIndex + 1) <= (CHARACTERS.length - 1) ? charIndex + 1 : 0;
            setCharIndex(newIndex);
        }, TIMEOUT);

        return () => {
            clearTimeout(timeout);
        };
    }, [charIndex]);

    return (
        <Text>{CHARACTERS[charIndex]}</Text>
    );
}