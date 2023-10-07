import React from 'react';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import EditUserForm from './EditUserForm';
import useTitle from '../hooks/useTitle';

const EditUsers = () => {
    const { id } = useParams();

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    useTitle(`Pindro Blog: Editing '${user?.username}'`);

    const content = (
        <div className='main-con edit-user-con flex-column'>
            {user ? 
                <EditUserForm user={user} /> : <ClipLoader />
            }
        </div>
    );

    return content;
}

export default EditUsers;