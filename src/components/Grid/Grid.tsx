import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Game, Store } from '../../helpers/interface';
import useDimensions from '../../helpers/useDimensions';
import useTimer from '../../helpers/useTimer';
import { actions } from '../../Store';
import Cell from "../Cell";
import Modal from "../Modal";
import './Grid.scss';

interface Props {
    size: number;
};

const gap = 2;

const Grid: FC<Props> = ({ size }) => {
    const { window_height } = useDimensions();
    const [cellSize, setCellSize] = useState((window_height - 300) / size);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const game: Game | undefined = useSelector((state: Store): Game | undefined => state.games[size]);
    const dispatch = useDispatch();
    const { isRunning, resume, stop, restart, hours, minutes, seconds, getTimeFormatted, addTime } = useTimer(250);
    const isFirstFrame = useRef(true);

    const handleClick = useCallback((x: number, y: number): void => {
        if (game!.isGameOver) return;
        dispatch(actions.clickCell(size, x, y));
        if (!isRunning) resume();
        if (game!.cells.every(cell => cell.x === cell.expectedX && cell.y === cell.expectedY)) {
            dispatch(actions.endGame(size));
            setShowModal(true);
            stop();
        }
    }, [dispatch, isRunning, resume, size, stop, game]);

    const createGame = useCallback((): void => {
        dispatch(actions.createGame(size));
    }, [dispatch, size]);

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
        dispatch(actions.setTimer(size, { hours, minutes, seconds, }));
    }, [dispatch, size, hours, minutes, seconds]);

    // add key down listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const { empty, size } = game!;
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
                    dispatch(actions.createGame(size));
                    restart();
                    stop();
                    break;
            };
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClick, game, dispatch, restart, stop]);

    return <>
        <div className='grid-shadow' />
        <Modal show={showModal} hide={() => setShowModal(false)}>
            <h1>You Won!</h1>
            <hr></hr>
            <div className='labels'>
                <label>You won in {minutes > 0 && `${minutes} minute${minutes > 1 ? 's' : ''} and `}{seconds} second{seconds > 1 ? 's' : ''}</label>
                <label>You clicked {game?.clickCount} time{game?.clickCount !== 1 ? 's' : ''}</label>
            </div>
            <div className="button-container">
                <button className='close' onClick={() => setShowModal(false)}>Close</button>
                <button className='play-again' onClick={() => {
                    createGame();
                    setShowModal(false);
                }}>Play Again</button>
            </div>
        </Modal>
        <div className='stats'>
            <p>{getTimeFormatted(0)}</p>
            <p>{game?.clickCount} clicks</p>
        </div>
        {game && game.cells.map(cell => <Cell
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
