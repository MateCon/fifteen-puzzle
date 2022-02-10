import { Store } from "../helpers/interface";

export const saveState = (state: Store): void => {
    localStorage.setItem("state", JSON.stringify(state));
}

export const loadState = (): Store | undefined => {
    const state = localStorage.getItem("state");
    return state ? JSON.parse(state) : undefined;
}
