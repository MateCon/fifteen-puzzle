import type { Action } from '../helpers/interface';

export const createGame = (size: number): Action => ({
    type: "CREATE_GAME",
    payload: { size }
});

export const clickCell = (size: number, x: number, y: number): Action => ({
    type: "CLICK_CELL",
    payload: { size, x, y }
});

export const setTimer = (
    size: number,
    time: {
        hours: number,
        minutes: number,
        seconds: number
    }
): Action => ({
    type: "SET_TIMER",
    payload: { size, time }
});

export const endGame = (size: number): Action => ({
    type: "END_GAME",
    payload: { size }
});
