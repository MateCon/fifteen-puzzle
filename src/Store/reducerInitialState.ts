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
    stats: { },
    settings: {
        audio: {
            volume: 50
        }
    }
};

export default initialState;
