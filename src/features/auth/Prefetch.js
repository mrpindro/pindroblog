import { store } from '../../store/store';
import { blogsApiSlice } from '../blogs/blogsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
        store.dispatch(blogsApiSlice.util.prefetch('getBlogs', 'blogs', { force: true }));
    }, []);

    return <Outlet />
}

export default Prefetch;