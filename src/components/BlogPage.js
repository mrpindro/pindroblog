import React from 'react';
import { useGetBlogsQuery } from '../features/blogs/blogsApiSlice';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import '../styles/blogs.css'
import useTitle from '../hooks/useTitle';

const BlogPage = () => {
    const { id } = useParams();
    const { blog } = useGetBlogsQuery('blogs', {
        selectFromResult: ({ data }) => ({
            blog: data?.entities[id]
        })
    })
    
    useTitle(`Pindro Blog: ${blog?.title}`);

    // useEffect(() => {
    //     dispatch()
    // })
    
    return (
        <div className='main-con'>
            {blog && (
                <article className='flex-column blogpage-con'>
                    <div className="blogpage-img">
                        <img src={blog.image} alt="" />
                    </div>
                    <div className="blogpage-content-all flex-column">
                        <h3>{blog.title}</h3>
                        <hr style={{width: '100%'}} />
                        <p className='blog-content'>
                            {blog.content}
                        </p>
                        <hr style={{width: '100%'}} />
                        <div className="creator-createdAt flex-row">
                            <p>
                                Created by: <span className='creator'>{blog.creator}</span>
                            </p>
                            <p className='createdAt'>{moment(blog.createdAt).fromNow()}</p>
                        </div>
                    </div>
                </article>
            )}
        </div>
    );
}

export default BlogPage;