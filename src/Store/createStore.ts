import { createStore as defaultCreateStore } from "redux";
import { loadState } from "./localstorage";
import reducer from "./reducer";

export default function createStore() {
    const prevState = loadState();
    return defaultCreateStore(reducer, prevState);
};
