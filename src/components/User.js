import React, { memo } from 'react';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import '../styles/users.css';

const User = ({userId}) => {
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/blogs/admin/users/${userId}`);
        const userRolesString = user.roles?.toString().replaceAll(',', ', ');

        return (
            <article className='user-con'>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{userRolesString}</p>
                <img src={user.image} alt="profile" />
                <button onClick={handleEdit}>
                    <AiFillEdit className='icon' />
                </button>
            </article>
        )

    } else {
        return null;
    }
}

const memoizedUser = memo(User);
export default memoizedUser;