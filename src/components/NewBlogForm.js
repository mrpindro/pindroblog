import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { axiosApi } from '../api/axiosApi';

const NewBlogForm = ({ userId }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(userId);

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onContentChanged = (e) => {
        setContent(e.target.value);
    }

    const onImageChanged = (e) => {
        setImage(e.target.files[0]);
    }

    const onSubmitBlog = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user', user);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        try {
            setLoading(true)
            const res = await axiosApi.post('/blogs', formData)
            console.log(res.data);

            setUser('');
            setTitle('');
            setContent('');
            setImage(null);
            navigate('/blogs');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form 
            className='flex-column'
            onSubmit={onSubmitBlog}
        >
            <h3>CREATE BLOG</h3>
            <div className="form-group blog-userId">
                <label htmlFor="blogUser" className='form-label'>User:</label>
                <input 
                    type="text" 
                    required
                    id='blogUser'
                    className='form-control'
                    name='user'
                    value={user}
                    onChange={(e) => e.target.value}
                />
            </div>
            <div className="form-group">
                <label htmlFor="blogTitle" className='form-label'>Title:</label>
                <input 
                    type="text" 
                    required
                    id='blogTitle'
                    className='form-control'
                    placeholder='Create a Title'
                    name='title'
                    value={title}
                    onChange={onTitleChanged}
                />
            </div>
            <div className="form-group with-textarea">
                <label htmlFor="blogContent" className='form-label'>
                    Content:
                </label>
                <textarea
                    placeholder='Create Content'
                    name='content'
                    id='blogContent'
                    className='form-control'
                    value={content}
                    onChange={onContentChanged}
                    required
                ></textarea>
            </div>
            <div className="form-group flex-column">
                <label htmlFor="blogImage" className='form-file-label'>
                    Image
                </label>
                <input 
                    type="file" 
                    required
                    id='blogImage'
                    className='form-file'
                    // name='image'
                    onChange={onImageChanged}
                    accept='image/*'
                />
            </div>
            <button
                type='submit' 
                className='form-btn'
            >
                {loading ? <ClipLoader /> : 'SUBMIT'}
            </button>
        </form>
    );
}

export default NewBlogForm;