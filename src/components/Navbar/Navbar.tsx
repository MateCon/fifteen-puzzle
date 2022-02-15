import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import { Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Store, Settings } from '../../helpers/interface';
import Modal from '../Modal';
import './Navbar.scss';
import { setVolume } from '../../Store/actions';

const Navbar: FC = () => {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const settings: Settings = useSelector((state: Store) => state.settings);
    const dispatch = useDispatch();

    return (
        <nav>
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
        </nav>
    )
}

export default Navbar;