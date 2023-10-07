import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BiLogOutCircle } from 'react-icons/bi';
import profile from '../image/profile.png';
import logo from '../image/logo.png';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import '../styles/leftbar.css';

const LeftBar = () => {
    // const { pathname } = useLocation();
    const token = useSelector(selectCurrentToken);
    const { username, image, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    // useEffect(() => {
    //     console.log(token)
    // })

    const onLogoutClicked = () => {
        sendLogout()
    }

    if(isLoading) {
        return <p>Logging Out...</p>
    }

    if(isError) {
        return <p>Error: {error.data?.message}</p>
    }

    return (
        <div className='leftbar-con flex-column'>
            <Link to='/blogs' className='nav-links logo'>
                <img src={logo} alt="logo" />
            </Link>
            <div className="current-user flex-row">
                <img src={image || profile} alt="profile" />
                <strong>{username}</strong>
            </div>
            <nav className='leftbar-nav'> 
                <ul className='flex-column'>
                    <li>
                        { token && (
                            <button 
                                className='logout'
                                onClick={onLogoutClicked}
                            >
                                LOGOUT <BiLogOutCircle />
                            </button>
                        )}
                    </li>
                    <li>
                        {isAdmin && (
                            <Link to='admin/users' className='nav-links admin-users'>
                                USERS
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default LeftBar;