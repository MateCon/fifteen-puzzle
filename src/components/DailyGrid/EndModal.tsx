import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../helpers/interface';
import Modal from '../Modal/Modal';

interface Props {
    showModal: boolean;
    game: Game | undefined;
    minutes: number;
    seconds: number;
    createGame: () => void;
    setShowModal: (showModal: boolean) => void;
}

const EndModal: FC<Props> = ({
    showModal,
    game,
    minutes,
    seconds,
    setShowModal
}) => {
    return (
        <Modal show={showModal} hide={() => setShowModal(false)}>
            <h1>You Won!</h1>
            <hr></hr>
            <div className='labels'>
                <label>You won in {minutes > 0 && `${minutes} minute${minutes > 1 ? 's' : ''} and `}{seconds} second{seconds > 1 ? 's' : ''}</label>
                <label>You clicked {game?.clickCount} time{game?.clickCount !== 1 ? 's' : ''}</label>
            </div>
            <div className="button-container">
                <button className='close' onClick={() => setShowModal(false)}>Close</button>
                <Link to="/"><button className='exit'>Exit</button></Link>
            </div>
        </Modal>
    )
}

export default EndModal;
