import { FC } from 'react';
import { Provider } from 'react-redux';
import createStore from "./Store";
import { saveState } from './Store/localstorage';

const store = createStore();
store.subscribe(() => saveState(store.getState()));

const Redux: FC = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default Redux;
