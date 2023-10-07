import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BiLogOutCircle } from 'react-icons/bi';
import profile from '../image/profile.png';
import logo from '../image/logo.png';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

const Home = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-IT', 
        {dateStyle: 'full', timeStyle: 'long'}).format(date);
    ;
    const navigate = useNavigate();
    const { username, isAdmin, image } = useAuth();
    // const { pathname } = useLocation();
    const token = useSelector(selectCurrentToken);

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
        <main className='flex-column home-con'>
            <div className="home-nav-header ">
                <div className='home-nav-con flex-row'>
                    <Link to='/blogs' className='nav-links logo'>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="current-user flex-row">
                        <img src={image || profile} alt="profile" />
                        <strong>{username}</strong>
                    </div>
                    <nav className='home-nav'> 
                        <ul className='flex-row'>
                            <li>
                                { token && (
                                    <button 
                                        className='logout'
                                        onClick={onLogoutClicked}
                                        title='Logout'
                                    >
                                        <BiLogOutCircle size={15} />
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
            </div>
            <div className='flex-row home-welcome' style={{ gap: '5px'}}>
                {today} <h3>Welcome {username}!</h3>
            </div>
            <div className="create-btn">
                <button onClick={() => navigate('blogs/new')}> 
                    <AiOutlinePlus /> <span>CREATE BLOG</span>
                </button>
            </div>
        </main>
    );
}

export default Home;