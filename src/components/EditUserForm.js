import React, { useEffect, useState } from 'react';
import { /*useUpdateUserMutation,*/ useDeleteUserMutation 
} from '../features/users/usersApiSlice';
import { ROLES } from '../config/roles';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { axiosApi } from '../api/axiosApi';

const  USER_REGEX = /^[A-z]{3,20}$/;
const  PWD_REGEX = /^[A-z0-9!@#$%]{3,20}$/;

const EditUserForm = ({user}) => {
    // const [ updateUser, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useUpdateUserMutation();

    const [ deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [pwdVisible, setPwdVisible] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState(user.image);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handlePwdVisibilty = () => {
        if (!pwdVisible) {
            setPwdVisible(true);
        } else {
            setPwdVisible(false);
        }
    }

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if(isDelSuccess) {
            setUsername('');
            setEmail('');
            setImage(null);
            setPassword('');
            setRoles([]);
            navigate('blogs/admin/users');
        }
    }, [isDelSuccess, navigate]);

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
    }

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values);
    }

    const onActiveChanged = () => {
        setActive(prev => !prev)
    }

    const submitUser = async (e) => {
        // e.preventDefault();
        const formData = new FormData();

        formData.append('username', username);
        formData.append('email', email);
        formData.append('image', image);
        formData.append('password', password);
        formData.append('active', active);
        formData.append('roles', roles);

        // if (password) {
            //     await updateUser({ id: user.id, username, email, formData, password, active, roles });
            // } else {
                //     await updateUser({ id: user.id, username, email, formData, active, roles });
                // }
        setIsLoading(true)    
        try {
            const res = await axiosApi.patch(`/users/${user.id}`, formData );

            console.log(res.data)

            navigate('/blogs/admin/users');
        } catch (error) {
            setIsError(error.message);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        await deleteUser({ id: user.id });
        navigate('/blogs/admin/users');
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option>
        );
    })

    let canSubmit;
    if (password) {
        canSubmit = [roles?.length, validUsername, validPassword].every(Boolean) && !isLoading;
    } else {
        canSubmit = [roles?.length, validUsername].every(Boolean) && !isLoading;
    }

    const errClass = (isError || isDelError) ? 'errmsg' : 'offscreen';
    const validUserClass = !validUsername ? 'form-input-complete' : '';
    const validPwdClass = !validPassword ? 'form-input-complete' : '';
    const validRolesClass = !Boolean(roles?.length) ? 'form-input-complete' : '';

    const errContent = (isError?.data?.message || delError?.data?.message) ?? ''

    const content = (
        <form 
            onSubmit={e => e.preventDefault()} 
            className='flex-column'
            encType='multipart/form-data'
        >
            <p className={errClass}>{errContent}</p> 
            <h3>Edit User</h3>
            <div className="form-group">
                <label htmlFor="edit-username" className='form-label'>
                    Username: <span>[3-20 letters]</span>
                </label>
                <input 
                    className={`form-control ${validUserClass}`}
                    type="text" 
                    id='edit-username'
                    name='username'
                    value={username}
                    onChange={onUsernameChanged}
                    placeholder='Enter Username'
                />
            </div>
            <div className="form-group">
                <label htmlFor="edit-email" className='form-label'>
                    Email:
                </label>
                <input 
                    className='form-control'
                    type="text" 
                    id='edit-email'
                    name='email'
                    value={email}
                    onChange={onEmailChanged}
                    placeholder='Enter Your Email'
                />
            </div>
            <div className="form-group flex-column">
                <label htmlFor="edit-image" className='form-file-label'>
                    Update Profile Image 
                </label>
                <input 
                    className='form-file'
                    type="file" 
                    id='edit-image'
                    // name='image'
                    onChange={onImageChanged}
                />
            </div>
            <div className="form-group">
                <label htmlFor="edit-password" className='form-label'>
                    Password: <span>[empty = no change]</span>
                </label>
                <input 
                    type={pwdVisible ? 'text' : 'password'}
                    id='edit-password'
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
            <div className="form-group">
                <label htmlFor="user-active">ACTIVE:</label>
                <input 
                    type="checkbox" 
                    className='form-checkbox'
                    id='user-active'
                    name='active'
                    checked={active}
                    onChange={onActiveChanged}
                />
            </div>
            <div className="form-select-grp flex-row">
                <label htmlFor="roles">
                    ASSIGNED ROLES:
                </label>
                <select 
                    name="roles" 
                    id="roles"
                    className={`form-select ${validRolesClass}`}
                    multiple={true}
                    size={2}
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </div>
            <div className='form-action-btns flex-row'>
                <button
                    type='button'
                    className='form-btn edit-user-btn'
                    title='Save'
                    onClick={submitUser}
                    disabled={!canSubmit}
                >
                    Submit
                </button>
                <button
                    type='button'
                    className='form-btn delete-user-btn'
                    title='Save'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </form>
    )

    return content;
}

export default EditUserForm;