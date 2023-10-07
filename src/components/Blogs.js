import React from 'react';
import { useGetBlogsQuery } from '../features/blogs/blogsApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import Blog from './Blog';
import '../styles/blogs.css';
import useTitle from '../hooks/useTitle';

const Blogs = () => {
    useTitle('Pindro Blog: Home');

    // const {
    //     data: blogs,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetBlogsQuery();
    
    const {
        data: blogs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBlogsQuery('blogs', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) {
        content = <ClipLoader />
    }

    if (isError) {
        content = <p className='errMsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = blogs;
        const pageContent = ids?.length ?
            ids.map(blogId => <Blog key={blogId} blogId={blogId} />) :
            null
        ;

        content = pageContent;

    }

    return (
        <div className="blogs flex-column">
            {content}
        </div>
    );
}

export default Blogs;