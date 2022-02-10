import { FC } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.scss';

const Navbar: FC = () => {
    return (
        <nav>
            <Link to="/stats">
                <IconButton>
                    <EqualizerIcon color='primary' />
                </IconButton>
            </Link>
            <Link to='/'><h1>FIFTEEN PUZZLE</h1></Link>
            <IconButton>
                <SettingsIcon color='primary' />
            </IconButton>
        </nav>
    )
}

export default Navbar;