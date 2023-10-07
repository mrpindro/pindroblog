import React from 'react';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import User from './User';
import '../styles/users.css';
import useTitle from '../hooks/useTitle';

const UsersList = () => {
    useTitle('Pindro Blog: Admin page for users');

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) {
        content = <ClipLoader />;
    }

    if (isError) {
        content = <p className='errMsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users;

        const pageContent = ids?.length ?
            ids.map(userId => <User key={userId} userId={userId} />) :
            null
        ;

        content = (
            <div className="userslist-con main-con">
                <ul className='userslist-head'>
                    <li>Username</li>
                    <li>Email</li>
                    <li>Roles</li>
                    <li>Profile Image</li>
                    <li>Edit</li>
                </ul>
                <div>{pageContent}</div>
            </div>
        )
    }

    return content;
}

export default UsersList;