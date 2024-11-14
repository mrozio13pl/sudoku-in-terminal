import React from 'react';
import { Window } from '~/components/ui/window';
import { InputHandler } from '~/components/input-handler';
import { Game } from '~/components/game/game';
import { Prompter } from '~/components/prompt/prompt';

export function App() {
    return (
        <InputHandler>
            <Window>
                <Game />
                <Prompter />
            </Window>
        </InputHandler>
    );
}