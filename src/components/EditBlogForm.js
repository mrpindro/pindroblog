import React, { useEffect, useState } from 'react';
import { useDeleteBlogMutation, useUpdateBlogMutation } from '../features/blogs/blogsApiSlice';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const EditBlogForm = ({userId, blog }) => {
    // const creator = useSelector(state => selectUserById(state, userId));
    const [ deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteBlogMutation();

    const [ updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBlogMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    // const [user, setUser] = useState(userId);
    // const [image, setImage] = useState(blog.image);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isSuccess || isDelSuccess) {
            // setUser('');
            setTitle('');
            setContent('');
            // setImage(null);
            navigate('/blogs');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    // const onUserChanged = (e) => {
    //     setUser(e.target.value);
    // }

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onContentChanged = (e) => {
        setContent(e.target.value);
    }

    // const onImageChanged = (e) => {
    //     setImage(e.target.files[0]);
    // }

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSubmitEditBlog = async (e) => {
        
        if (canSave) {
            await updateUser({ id: blog.id, user: userId, title, content })
        }

        navigate('/blogs');
    }

    const onDelete = async () => {
        await deleteUser({ id: blog.id });
        navigate('/blogs');
    }

    const errClass = (isError || isDelError) ? 'errMsg' : 'offscreen';
    const errContent = (error?.data?.message || delError?.data?.message) ?? '';

    const blogContent = (
        <form 
            onSubmit={e => e.preventDefault()} 
            className='flex-column'
            encType='multipart/form-data'
        >
            <p className={errClass}>{errContent}</p> 
            <h3>Edit Blog</h3>
            {/* <div className="form-group blog-userId">
                <label htmlFor="editBlogUser" className='form-label'>
                    User: 
                </label>
                <input 
                    className='form-control'
                    type="text" 
                    id='editBlogUser'
                    name='user'
                    value={user}
                    onChange={onUserChanged}
                />
            </div> */}
            <div className="form-group">
                <label htmlFor="edit-title" className='form-label'>
                    Title: 
                </label>
                <input 
                    className='form-control'
                    type="text" 
                    id='edit-title'
                    name='title'
                    value={title}
                    onChange={onTitleChanged}
                    placeholder='Create a Title'
                />
            </div>
            <div className="form-group with-textarea">
                <label htmlFor="editBlogContent" className='form-label'>
                    Content:
                </label>
                <textarea
                    placeholder='Create Content'
                    name='content'
                    id='editBlogContent'
                    className='form-control'
                    required
                    value={content}
                    onChange={onContentChanged}
                ></textarea>
            </div>
            {/* <div className="form-group flex-column">
                <label htmlFor="edit-blog-image" className='form-file-label'>
                    Update Blog Image 
                </label>
                <input 
                    className='form-file'
                    type="file" 
                    id='edit-blog-image'
                    onChange={onImageChanged}
                />
            </div> */}
            <div className='form-action-btns flex-row'>
                <button
                    type='button'
                    className='form-btn edit-user-btn'
                    title='Save'
                    onClick={onSubmitEditBlog}
                >
                    { isLoading ? <ClipLoader /> : 'Submit' }
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

    return blogContent;
}

export default EditBlogForm;