import React, { useEffect, useState } from 'react';
import BigText from 'ink-big-text';
import { useTheme } from '~/hooks/use-theme';
import { setTerminalTitle } from '~/helpers/set-terminal-title';

const TITLE = 'Sudoku';
const TYPING_SPEED = 100;

export function Logo() {
    const [title, setTitle] = useState(TITLE[0]);
    const [isCompleted, setIsCompleted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (isCompleted) return;

        const timeout = setTimeout(() => {
            if (title.length === TITLE.length) {
                setIsCompleted(true);
                return;
            }

            setTitle(prevTitle => {
                const newTitle = prevTitle + TITLE[title.length];
                setTerminalTitle(newTitle);
                return newTitle;
            });
        }, TYPING_SPEED);

        return () => { clearTimeout(timeout) };
    });

    return (
        <BigText text={title} font='simple3d' colors={[theme.primary, theme.secondary]} />
    );
}