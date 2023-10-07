import React, { memo } from 'react';
import { useGetBlogsQuery } from '../features/blogs/blogsApiSlice';
import { Link } from 'react-router-dom';
import '../styles/blogs.css';
import moment from 'moment';
import { AiFillEdit } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';

const Blog = ({blogId}) => {
    const { blog } = useGetBlogsQuery('blogs', {
        selectFromResult: ({ data }) => ({
            blog: data?.entities[blogId]
        })
    })
    const { username, isAdmin } = useAuth();

    if (!blog?.length) {
        <p>No blog found</p>
    }

    return (
        <article className='flex-row blog-con'>
            <div className="blog-img">
                <img src={blog.image} alt="" />
            </div>
            <div className="blog-content-all flex-column">
                <h3>{blog.title}</h3>
                <hr style={{width: '100%'}} />
                <p className='blog-content'>
                    {blog.content.substring(0, 75)}... 
                    <Link to={`blogs/${blogId}`}>view post</Link>
                </p>
                <hr style={{width: '100%'}} />
                <div className="blog-edit flex-row">
                    {(blog?.creator === username || isAdmin) && (
                        <Link to={`blogs/edit/${blogId}`} className='nav-links flex-row'>
                            Edit <AiFillEdit />
                        </Link>
                    )}
                </div>
                <div className="creator-createdAt flex-row">
                    <p className='createdby'>
                        <span className='cr'>Created by:</span> <span className='creator'>
                            {blog.creator}
                        </span>
                    </p>
                    <p className='createdAt'>{moment(blog.createdAt).fromNow()}</p>
                </div>
            </div>
        </article>
    );
}

const memoizedBlog = memo(Blog);

export default memoizedBlog;