import React, { useEffect, useRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from 'react-icons/ai';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usePersist from '../hooks/usePersist';

const Login = ({navRegister}) => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pwdVisible, setPwdVisible] = useState(false);
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [username, password]);

    const errClass = errMsg ? 'errMsg' : 'offscreen';

    if(isLoading) {
        return <p>Loading...</p>
    }

    const handlePwdVisibilty = () => {
        if (!pwdVisible) {
            setPwdVisible(true);
        } else {
            setPwdVisible(false);
        }
    }

    const handleUserInput = (e) => {
        setUsername(e.target.value);
    }

    const handlePwdInput = (e) => {
        setPassword(e.target.value);
    }

    const handleToggle = () => {
        setPersist(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await login({ username, password }).unwrap();
            // const res = 
            dispatch(setCredentials({ accessToken }));
            // console.log(res);
            setUsername('');
            setPassword('');
            navigate('/blogs');
        } catch (error) {
            if (!error.status) {
                setErrMsg('No Server Response');
            } else if (error.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(error.data?.message)
            }
            errRef.current.focus();
        }
    }

    return (
        <form 
            className='flex-column'
            onSubmit={handleSubmit}
        >
            <h3>LOGIN</h3>
            <p ref={errRef} className={errClass} aria-live='assertive'>
                {errMsg}
            </p>
            <div className="form-banner">
                <AiFillLock className='form-icon' />
            </div>
            <div className="form-group">
                <label htmlFor="loginUsername" className='form-label'>Username:</label>
                <input 
                    type="text" 
                    required
                    id='loginUsername'
                    className='form-control'
                    placeholder='Enter Username'
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                />
            </div>
            <div className="form-group">
                <label htmlFor="loginPassword" className='form-label'>Password:</label>
                <input 
                    type={pwdVisible ? 'text' : 'password'} 
                    required
                    id='loginPassword'
                    className='form-control'
                    placeholder='Enter Password'
                    value={password}
                    onChange={handlePwdInput}
                />
                <div className="show-pwd" onClick={handlePwdVisibilty}>
                    {pwdVisible ? (
                        <AiFillEyeInvisible />
                    ) : (
                        <AiFillEye />
                    )}
                </div>
            </div>
            <div className="flex-row">
                <input 
                    type="checkbox" 
                    className='form-checkbox'
                    id='persist'
                    checked={persist}
                    onChange={handleToggle}
                />
                <label htmlFor="persist">
                    Trust This Device
                </label>
            </div>
            <button
                type='submit' 
                className='form-btn'
            >
                SIGN IN
            </button>

            <div className="toggle-reg-log flex-row">
                <p>You aren't yet registered?</p>
                <span onClick={navRegister}>Sign Up</span>
            </div>
        </form>
    );
}

export default Login