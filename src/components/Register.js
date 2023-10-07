import React, { useEffect, useState } from 'react'
import { AiFillLock } from 'react-icons/ai';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
// import { useAddNewUserMutation } from '../features/users/usersApiSlice';
// import { useNavigate } from 'react-router-dom';
import { axiosApi } from '../api/axiosApi';
import ClipLoader from 'react-spinners/ClipLoader';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = ({navLogin}) => {
    // const [addNewUser, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useAddNewUserMutation();

    // const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pwdVisible, setPwdVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password]);

    // useEffect(() => {
    //     if (isSuccess) {
    //         setUsername('');
    //         setEmail('');
    //         setPassword('');
    //         setImage(null)
    //         navigate('/');
    //     }
    // }, [isSuccess, navigate]);

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const canSubmit = [validUsername, validPassword].every(Boolean) && !loading;

    const onSubmitUser = async (e) => {
        e.preventDefault();
        // if (canSubmit) {
        //     await addNewUser({ username, email, password, image })
        // }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('image', image);
        formData.append('password', password);

        try {
            setLoading(true);
            const res = await axiosApi.post('/users', formData)
            console.log(res.data);
            navLogin();
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handlePwdVisibilty = () => {
        if (!pwdVisible) {
            setPwdVisible(true);
        } else {
            setPwdVisible(false);
        }
    }

    const errClass = error ? 'errmsg' : 'offscreen';
    const validUserClass = !validUsername ? 'form-input-incomplete' : '';
    const validPwdClass = !validPassword ? 'form-input-incomplete' : '';

    return (
        <form 
            className='flex-column'
            onSubmit={onSubmitUser}
        >
            <p className={errClass}>{error?.message}</p>
            <h3>REGISTER</h3>
            <div className="form-banner">
                <AiFillLock className='form-icon' />
            </div>
            <div className="form-group">
                <label htmlFor="registerUsername" className='form-label'>
                    Username: <span>[3-20 letters]</span>
                </label>
                <input 
                    type="text" 
                    required
                    id='registerUsername'
                    className={`form-control ${validUserClass}`}
                    placeholder='Enter Username'
                    name='username'
                    value={username}
                    onChange={onUsernameChanged}
                />
            </div>
            <div className="form-group">
                <label htmlFor="registerEmail" className='form-label'>Email:</label>
                <input 
                    type="email" 
                    required
                    id='registerEmail'
                    className='form-control'
                    placeholder='Enter Your Email'
                    name='email'
                    value={email}
                    onChange={onEmailChanged}
                />
            </div>
            <div className="form-group flex-column">
                <label htmlFor="registerImage" className='form-file-label'>
                    Profile Image
                </label>
                {/* {image && <center>{image.name}</center>} */}
                <input 
                    type="file" 
                    required
                    id='registerImage'
                    className='form-file'
                    // name='image'
                    onChange={onImageChanged}
                    accept='image/*'
                />
            </div>
            <div className="form-group">
                <label htmlFor="registerPassword" className='form-label'>
                    Password: <span>[4-12 chars incl. !@#$%]</span>
                </label>
                <input 
                    type={pwdVisible ? 'text' : 'password'}
                    required
                    id='registerPassword'
                    className={`form-control ${validPwdClass}`}
                    placeholder='Enter Password'
                    name='password'
                    value={password}
                    onChange={onPasswordChanged}
                />
                <div className="show-pwd" onClick={handlePwdVisibilty}>
                    {pwdVisible ? (
                        <AiFillEyeInvisible />
                    ) : (
                        <AiFillEye />
                    )}
                </div>
            </div>
            <button
                type='submit' 
                className='form-btn'
                disabled={!canSubmit}
            >
                {loading ? <ClipLoader /> : 'SIGN UP'}
            </button>

            <div className="toggle-reg-log flex-row">
                <p>Already have an Account?</p>
                <span onClick={navLogin}>Sign In</span>
            </div>
        </form>
    );
}

export default Register;