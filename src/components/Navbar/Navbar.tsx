import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: FC = () => {
    return (
        <nav>
            <Link to='/'><h1>FIFTEEN PUZZLE</h1></Link>
        </nav>
    )
}

export default Navbar;