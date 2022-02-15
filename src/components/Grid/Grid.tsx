import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Game, Settings, Store } from '../../helpers/interface';
import useDimensions from '../../helpers/useDimensions';
import useTimer from '../../helpers/useTimer';
import { actions } from '../../Store';
import Cell from "../Cell";
import EndModal from './EndModal';
import Stats from './Stats';
import { Player, Channel } from 'tone';
import './Grid.scss';

const ClickSound = require("../../assets/sounds/Click.wav");
const WinSound = require("../../assets/sounds/Win.wav");

const clickPlayer = new Player({ url: ClickSound });
const winPlayer = new Player({ url: WinSound });

interface Props {
    mode: number | 'Daily';
};

const gap = 2;

const Grid: FC<Props> = ({ mode }) => {
    const size = useMemo(() => mode === 'Daily' ? 4 : mode, [mode]);
    const { window_height } = useDimensions();
    const [cellSize, setCellSize] = useState((window_height - 300) / size);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const game: Game | undefined = useSelector((state: Store): Game | undefined => state.games[mode]);
    const settings: Settings = useSelector((state: Store) => state.settings);
    const dispatch = useDispatch();
    const { isRunning, resume, stop, restart, hours, minutes, seconds, getTimeFormatted, addTime } = useTimer(250);
    const isFirstFrame = useRef(true);
    const [empty, setEmpty] = useState<[number, number]>(game && game.empty ? [game!.empty[0], game!.empty[1]] : [-1, -1]);

    const handleClick = useCallback((x: number, y: number): void => {
        if (game!.isGameOver) return;
        dispatch(actions.clickCell(mode, x, y));
        if (!isRunning) resume();
        if (game!.cells.every(cell => cell.x === cell.expectedX && cell.y === cell.expectedY)) {
            dispatch(actions.endGame(mode));
            winPlayer.start();
            setShowModal(true);
            stop();
        }
    }, [dispatch, isRunning, resume, mode, stop, game]);

    const createGame = useCallback(() => {
        dispatch(actions.createGame(mode));
        restart();
    }, [dispatch, restart, mode]);

    // handle volume
    useEffect(() => {
        clickPlayer.disconnect();
        winPlayer.disconnect();
        if (settings.audio.volume === 0) return;
        const volume = (settings.audio.volume - 100) * 0.25;
        const clickChannel = new Channel(volume).toDestination();
        const winChannel = new Channel(volume / 2).toDestination();
        clickPlayer.connect(clickChannel);
        winPlayer.connect(winChannel);
    }, [settings]);

    // create game on mount if it was undefined
    useEffect(() => {
        if (isFirstFrame.current)
            isFirstFrame.current = false;
        else
            return;
        if (!game || game.isGameOver) {
            createGame();
            return;
        }
        if (!game.isGameStarted) {
            stop();
            return;
        }
        if (!game.isGameOver) {
            addTime((game.time.hours * 3600 + game.time.minutes * 60 + game.time.seconds) * 1000);
            resume();
        }
    }, [game, createGame, resume, addTime, stop, isFirstFrame]);

    // resize cells on resize of window
    useEffect(() => {
        setCellSize((window_height - 300) / size);
        setTotalSize(cellSize * size + gap * (size - 1));
    }, [window_height, setCellSize, setTotalSize, cellSize, size]);

    // update redux's timer every second
    useEffect(() => {
        dispatch(actions.setTimer(mode, { hours, minutes, seconds, }));
    }, [dispatch, mode, hours, minutes, seconds]);

    // on every move make a sound
    useEffect(() => {
        if (!game) return;
        if (game.empty[0] === empty[0] && game.empty[1] === empty[1]) return;
        setEmpty(game.empty);
        clickPlayer.start();
    }, [game, empty, setEmpty]);

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
                case 'r':
                    if (e.metaKey) return;
                    createGame();
                    setShowModal(false);
                    stop();
                    break;
            };
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClick, game, dispatch, restart, stop, setShowModal, createGame, mode]);

    return <>
        <div className='grid-shadow' />
        <EndModal {...{ showModal, game, minutes, seconds, createGame, setShowModal }} />
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

export default Grid;
