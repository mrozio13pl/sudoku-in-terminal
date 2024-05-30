import React, { useEffect, useState } from 'react';
import BigText from 'ink-big-text';
import { COLORS } from '~/constants';
import { setTerminalTitle } from '~/helpers/set-terminal-title';

const TITLE = 'Sudoku';
const TYPING_SPEED = 100;

export function Logo() {
    const [title, setTitle] = useState(TITLE[0]);
    const [isCompleted, setIsCompleted] = useState(false);

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
        <BigText text={title} font='simple3d' colors={[COLORS.primary, COLORS.secondary]} />
    );
}