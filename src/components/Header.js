import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png';
import { AiOutlineLogin } from 'react-icons/ai';

const Header = () => {
    // const { pathname } = useLocation();

    return (
        <header className='flex-row'>
            <Link to='/' className='nav-links logo'>
                <img src={logo} alt="logo" />
            </Link>
            <nav className='header-nav'> 
                <ul className='flex-row'>
                    <li>
                        <Link to='/auth' className='nav-links'>
                            <button className='login'>
                                LOGIN <AiOutlineLogin />
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;