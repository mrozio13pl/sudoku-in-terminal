import { useSudoku } from '~/hooks/use-sudoku';
import { handleAction } from '~/handlers/action';

/** Redo an action. */
export function handleRedo() {
    const { withdrawnActions, setWithdrawnActions } = useSudoku.getState();
    const lastAction = withdrawnActions.at(-1);

    if (!lastAction) return;

    handleAction(lastAction.type, ('value' in lastAction) && lastAction.value);
    setWithdrawnActions(withdrawnActions.slice(0, -1));
}