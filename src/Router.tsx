import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Error from './pages/Error';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

const Router: FC = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="stats" element={<Stats />}>
                <Route path=":size" element={<Stats />} />
            </Route>
            <Route path="/game" element={<Game />}>
                <Route path=":size" element={<Game />} />
            </Route>
            <Route path="*" element={<Error>404 - page not found</Error>} />
        </Routes>
    </BrowserRouter>
);

export default Router;
