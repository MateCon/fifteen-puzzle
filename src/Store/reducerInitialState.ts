import { Store } from "../helpers/interface";

const initialState: Store = {
    games: {
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
        9: undefined,
        "Daily": undefined
    },
    stats: { }
};

let statTypes: (number|string)[] = [4, 5, 6, 7, 8, 9, "Total", "Daily"];

for (let i of statTypes) {
    initialState.stats[i] = {
        completedGames: 0,
        totalClicks: 0,
        totalTime: 0,
        bestTime: 0,
        leastClicks: 0
    };
}

export default initialState;
