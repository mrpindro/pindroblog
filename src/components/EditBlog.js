import React from 'react';
import { useGetBlogsQuery } from '../features/blogs/blogsApiSlice';
import { useParams } from 'react-router-dom';
import EditBlogForm from './EditBlogForm';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';

const EditBlog = () => {
    const { id } = useParams();
    const { username, userId } = useAuth();
    const { blog } = useGetBlogsQuery('blogs', {
        selectFromResult: ({ data }) => ({
            blog: data?.entities[id]
        })
    })

    useTitle(`Pindro Blog: Editing '${blog?.title}'`);

    if (!username && !userId ) {
        return (
            <p>Not Available</p>
        )
    }
    const content = blog && <EditBlogForm userId={userId} blog={blog} />;

    return (
        <div className='main-con flex-column'>
            {content}
        </div>
    );
}

export default EditBlog;