/* eslint-disable quote-props */
import { useSudoku } from '~/hooks/use-sudoku';
import { handleAction } from '~/handlers/action';
import type { ActionType, Coord } from '~/types';

const reversedActions = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left',
} as Record<ActionType, ActionType>;

/** Undo an action. */
export function handleUndo() {
    const { actions, withdrawnActions, setActions, setWithdrawnActions } = useSudoku.getState();
    const lastAction = actions.at(-1);

    if (!lastAction) return;

    let reverseAction = reversedActions[lastAction.type] || lastAction.type;
    let reverseValue: Coord;

    if (lastAction.type === 'value') {
        reverseValue = lastAction.previousValue;
        reverseAction = 'value';
    }

    if (lastAction.type === 'remove') {
        reverseValue = lastAction.previousValue;
        reverseAction = 'remove';
    }

    handleAction(reverseAction, reverseValue!, void(0), false);
    setActions(actions.slice(0, -1));
    setWithdrawnActions([
        ...withdrawnActions,
        lastAction
    ]);
}