import React from 'react';
import useAuth from '../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import { BiHome } from 'react-icons/bi';

const Footer = () => {
    const date = new Date();
    const { username, status} = useAuth();

    return (
        <footer className='flex-column'>
            {username && (
                <div className="online-status">
                    <div className='status'>
                        <p className='on'>Current User:</p> <span>{username}</span>
                    </div>
                    <div className='status'>
                        <p className='on'>Status:</p> <span>{status}</span>
                    </div>
                </div>
            )}
            <div className='copyright'>
                <h4>All Rights Reserved</h4>
                <p>
                    Copyright © {date.getFullYear()} | Austine Pindro
                </p>
            </div>
            {/* {username && (
                <div className="footer-nav">
                    <Link to='/blogs' className='nav-links'>
                        <BiHome className='footer-icon' />
                    </Link>
                </div>
            )} */}
        </footer>
    );
}

export default Footer;