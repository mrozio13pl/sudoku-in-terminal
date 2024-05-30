import React from 'react';
import onetime from 'onetime';
import { Window } from './components/ui/window';
import { InputHandler } from './components/input-handler';
import { Game } from './components/game/game';
import { Prompter } from './components/prompt/prompt';
import { init } from '~/core/init';

export function App() {
    onetime(() => {
        init();
    })();

    return (
        <InputHandler>
            <Window>
                <Game />
                <Prompter />
            </Window>
        </InputHandler>
    );
}