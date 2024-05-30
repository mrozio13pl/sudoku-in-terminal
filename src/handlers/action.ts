import { useSudoku } from '~/hooks/use-sudoku';
import type { Action, ActionType, Coord, Pos } from '~/types';

/**
 * Handle and execute an action in the game.
 * @param {Action} action Action to execute.
 * @param {Coord | false} value Numeric value if typing a number.
 * @param {Coord | false} previousValue Previous value of the cell, if changed.
 * @param {boolean} pushToActions Whether the action should be added to actions in sudoku hook. (Default: `true`)
 */
export function handleAction(
    action: ActionType,
    value?: Coord | false,
    previousValue?: Coord | false,
    pushToActions = true
): void {
    const { actions, board, pos, setActions, setBoard, setPos } = useSudoku.getState();
    const currentCell = board![pos[0]][pos[1]];

    if (pushToActions) {
        setActions([
            ...actions,
            {
                type: action,
                value,
                previousValue,
            } as Action
        ]);
    }

    switch (action) {
        case 'down': {
            setPos([pos[0] + 1, pos[1]] as Pos);
            break;
        }
        case 'up': {
            setPos([pos[0] - 1, pos[1]] as Pos);
            break;
        }
        case 'left': {
            setPos([pos[0], pos[1] - 1] as Pos);
            break;
        }
        case 'right': {
            setPos([pos[0], pos[1] + 1] as Pos);
            break;
        }
        case 'remove': {
            currentCell.value = false;
            setBoard(board);
            break;
        }
        case 'value': {
            currentCell.value = value!;
            setBoard(board);
            break;
        }
        case 'mark': {
            currentCell.marked = !currentCell.marked;
            setBoard(board);
            break;
        }
        default: {
            break;
        }
    }
}