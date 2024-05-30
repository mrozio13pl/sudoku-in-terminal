import React from 'react';
import { useInput, useStdin } from 'ink';
import { handleInput } from '~/handlers/input';
import { Fatal } from './fatal';

export function InputHandler({ children }: Readonly<{
    readonly children: React.ReactNode
}>) {
    const { isRawModeSupported } = useStdin();

    if (!isRawModeSupported) {
        return <Fatal message='Raw mode is not supported!' />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInput((input, key) => {
        handleInput(input, key);
    });

    return children;
}