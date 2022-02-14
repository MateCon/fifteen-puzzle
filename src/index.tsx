import { render } from 'react-dom';
import Router from './Router';
import Redux from './Redux';
import { initializeApp } from 'firebase/app';
import config from './appConfig';
import './index.css';

initializeApp(config);

render(
    <Redux>
        <Router />
    </Redux>,
    document.querySelector('#root')
);
