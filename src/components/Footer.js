import React from 'react';
import useAuth from '../hooks/useAuth';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { BiHome } from 'react-icons/bi';

const Footer = () => {
    const date = new Date();
    const { username, status} = useAuth();
    const navigate = useNavigate();

    return (
        <footer className='flex-column'>
            {username && (
                <div 
                    className="flex-row footer-search"
                    onClick={() => navigate('/blogs/search')}
                >
                    <AiOutlineSearch className='footer-icon' />
                    <p>SEARCH BLOG</p>
                </div>
            )}
            <hr style={{ width: '100%' }} />
            {username && (
                <div className="online-status">
                    <div className='status flex-row'>
                        <p className='on'>Current User:</p> <span>{username}</span>
                    </div>
                    <div className='status flex-row'>
                        <p className='on'>Status:</p> <span>{status}</span>
                    </div>
                </div>
            )}
            <div className='copyright flex-column'>
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