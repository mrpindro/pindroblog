import React from 'react';
import NewBlogForm from './NewBlogForm';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';

const CreateBlog = () => {
    useTitle('Pindro Blog: Create Blog');

    const { username, userId } = useAuth();

    if (!username) {
        return <p>Login or Register to Post Blogs</p>
    }

    const content = <NewBlogForm userId={userId} />;
    // const content = <NewBlogForm />;

    return (
        <div className='main-con flex-column'>
            {content}
        </div>
    );
}

export default CreateBlog;