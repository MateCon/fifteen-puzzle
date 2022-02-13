import type { Action, Game } from '../helpers/interface';

export const createGame = (size: number|string): Action => ({
    type: "CREATE_GAME",
    payload: { size }
});

export const createDailyGame = (game: Game): Action => ({
    type: "CREATE_DAILY_GAME",
    payload: { game }
});

export const clickCell = (size: number|string, x: number, y: number): Action => ({
    type: "CLICK_CELL",
    payload: { size, x, y }
});

export const setTimer = (
    size: number|string,
    time: {
        hours: number,
        minutes: number,
        seconds: number
    }
): Action => ({
    type: "SET_TIMER",
    payload: { size, time }
});

export const endGame = (size: number|string): Action => ({
    type: "END_GAME",
    payload: { size }
});
