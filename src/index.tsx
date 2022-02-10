import { render } from 'react-dom';
import Router from './Router';
import Redux from './Redux';
import './index.css';

render(
    <Redux>
        <Router />
    </Redux>,
    document.querySelector('#root')
);
