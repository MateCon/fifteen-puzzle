import type { Store, Action, Game } from '../helpers/interface';
import { createGame, clickCell, addToStats } from './helpers';
import initialState from './reducerInitialState';

export default function reducer(
    state: Store = initialState,
    action: Action
): Store {
    let game: Game | undefined;
    switch(action.type) {
        case "CREATE_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.size]: createGame(action.payload.size)
                }
            };
        case "CLICK_CELL":
            game = state.games[action.payload.size];
            if(!game) return state;
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.size]: {
                        ...game,
                        ...clickCell(game, action.payload.x, action.payload.y),
                        isGameStarted: true
                    }
                }
            };
        case "SET_TIMER":
            game = {
                ...state.games[action.payload.size]!,
                time: action.payload.time
            };
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.size]: game
                }
            };
        case "END_GAME":
            game = {
                ...state.games[action.payload.size]!,
                isGameOver: true
            };
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.size]: game
                },
                stats: {
                    ...state.stats,
                    [action.payload.size]: addToStats(game, state.stats[action.payload.size]!),
                    Total: addToStats(game, state.stats.total)
                }
            };
        default:
            return state;
    };
};
