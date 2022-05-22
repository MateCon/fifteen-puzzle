import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Store, Settings } from '../../helpers/interface';
import Modal from '../Modal';
import './Navbar.scss';
import { setVolume } from '../../Store/actions';
import tutorial_1 from "../../assets/images/tutorial_1.png";
import tutorial_2 from "../../assets/images/tutorial_2.png";

const Navbar: FC = () => {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showTutorial, setShowTutorial] = useState<boolean>(false);
    const settings: Settings = useSelector((state: Store) => state.settings);
    const dispatch = useDispatch();

    return (
        <nav>
            <div></div>
            <Link to="/stats">
                <IconButton>
                    <EqualizerIcon color='primary' />
                </IconButton>
            </Link>
            <Link to='/'><h1>FIFTEEN PUZZLE</h1></Link>
            <div onClick={() => setShowSettings(!showSettings)}>
                <IconButton>
                    <SettingsIcon color='primary' />
                </IconButton>
            </div>
            <div onClick={() => setShowTutorial(!showTutorial)}>
                <IconButton>
                    <InfoIcon color='primary' />
                </IconButton>
            </div>
            <Modal
                show={showSettings}
                hide={() => setShowSettings(false)}
            >
                {showSettings && <>
                    <h2>Audio</h2>
                    <label>Volume</label>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown />
                        <Slider
                            aria-label="Volume"
                            value={settings.audio.volume}
                            onChange={(_, value) => {
                                typeof value === 'number' && dispatch(setVolume(value))
                            }}
                        />
                        <VolumeUp />
                    </Stack>
                </>} <div />
            </Modal>
            <Modal
                show={showTutorial}
                hide={() => setShowTutorial(false)}
            >
                {showTutorial && <>
                    <h2>About</h2>
                    <p>This is a new version of the the classic game 15 puzzle of Game of Fifteen</p>
                    <h2>Tutorial</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: 10 }}>15 puzzle is a sliding puzzle consisting of an N by N board filled with numbers and one empty square</p>
                        <img src={tutorial_1} style={{ width: '50%', marginTop: 5, marginBottom: 5 }} alt="initial game state" />
                    </div>
                    <p style={{ marginTop: 10, marginBottom: 10 }}>You can move a number adjacent to the empty square into it by clicking it</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={tutorial_2} style={{ width: '50%', marginTop: 5, marginBottom: 5 }} alt="initial final state" />
                        <p>The objective of the game is to get all the squares in numerical order from left to right and top to bottom</p>
                    </div>
                    <hr />
                    <p>Created by <a style={{ color: '#0fb9f2', textDecoration: 'underline' }} href="http://github.com/matecon" target="_blank" rel="norefferer noreferrer">MateCon</a></p>
                </>} <div />
            </Modal>
        </nav>
    )
}

export default Navbar;