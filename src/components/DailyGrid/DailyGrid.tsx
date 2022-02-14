import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { DailyGame, Store, Result } from '../../helpers/interface';
import useDimensions from '../../helpers/useDimensions';
import useTimer from '../../helpers/useTimer';
import { actions } from '../../Store/Store';
import Cell from "../Cell/Cell";
import EndModal from './EndModal';
import Stats from './Stats';
import axios from 'axios';
import './Grid.scss';

const gap = 2;
const size = 4;

const DailyGrid: FC = () => {
    const { window_height } = useDimensions();
    const [cellSize, setCellSize] = useState((window_height - 300) / size);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const game: DailyGame | undefined = useSelector((state: Store): DailyGame | undefined => state.games.Daily);
    const dispatch = useDispatch();
    const { isRunning, resume, stop, restart, hours, minutes, seconds, getTimeFormatted, addTime } = useTimer(250);
    const isFirstFrame = useRef(true);
    const [result, setResult] = useState<Result>({ position: 0, total: 0 });

    const handleClick = useCallback((x: number, y: number): void => {
        if (game!.isGameOver) return;
        dispatch(actions.clickCell('Daily', x, y));
        if (!isRunning) resume();
        if (game!.cells.every(cell => cell.x === cell.expectedX && cell.y === cell.expectedY)) {
            dispatch(actions.endGame('Daily'));
            setShowModal(true);
            stop();
            axios({
                method: 'post',
                url: 'http://localhost:8080/daily',
                params: {
                    clickCount: game!.clickCount,
                    time: game!.time.hours * 3600 + game!.time.minutes * 60 + game!.time.seconds
                }
            }).then(res => {
                setResult(res.data);
            });
        }
    }, [dispatch, isRunning, resume, stop, game, setResult]);

    const createGame = useCallback(() => {
        axios
            .get('http://localhost:8080/daily')
            .then(res => {
                const data = res.data;
                dispatch(actions.createDailyGame(data));
            });
        restart();
    }, [dispatch, restart]);

    // create game on mount
    // if it was undefined or the day has changed
    useEffect(() => {
        if (isFirstFrame.current)
            isFirstFrame.current = false;
        else
            return;
        if (!game || game.day !== new Date().getDate()) {
            createGame();
            return;
        }
        if (!game.isGameStarted) {
            stop();
            return;
        }
        if (game.isGameStarted) {
            addTime((game.time.hours * 3600 + game.time.minutes * 60 + game.time.seconds) * 1000);
        }
        if (!game.isGameOver) {
            resume();
        }
    }, [game, createGame, resume, addTime, stop, isFirstFrame]);

    // resize cells on resize of window
    useEffect(() => {
        setCellSize((window_height - 300) / size);
        setTotalSize(cellSize * size + gap * (size - 1));
    }, [window_height, setCellSize, setTotalSize, cellSize]);

    // update redux's timer every second
    useEffect(() => {
        dispatch(actions.setTimer('Daily', { hours, minutes, seconds, }));
    }, [dispatch, hours, minutes, seconds]);

    // add key down listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const { empty } = game!;
            switch (e.key) {
                case 'w':
                    handleClick(empty[0], empty[1] + 1);
                    break;
                case 'a':
                    handleClick(empty[0] + 1, empty[1]);
                    break;
                case 's':
                    handleClick(empty[0], empty[1] - 1);
                    break;
                case 'd':
                    handleClick(empty[0] - 1, empty[1]);
                    break;
            };
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClick, game, dispatch, restart, stop, setShowModal, createGame]);

    return <>
        <div className='grid-shadow' />
        <EndModal {...{ showModal, game, minutes, seconds, createGame, setShowModal, result }} />
        {game?.isGameStarted && <Stats {...{ getTimeFormatted, game }} />}
        {game && game.cells && game.cells.map(cell => <Cell
            key={cell.index}
            index={cell.index}
            x={cell.x}
            y={cell.y}
            {...{ gap, size, cellSize, totalSize }}
            backgroundColor={`rgb(${cell.r}, ${cell.g}, ${cell.b})`}
            handleClick={() => handleClick(cell.x, cell.y)}
        />)}
    </>
}

export default DailyGrid;
