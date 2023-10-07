import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    const token = useSelector(selectCurrentToken);

    return (
        <div className='flex-column' style={{ height: '300px' }}>
            <h3>Sorry Page Not Found!</h3>
            {token ? (
                <Link to='/blogs'>Back to Homepage</Link>
            ) : (
                <Link to='/'>Back to Homepage</Link>
            )}
        </div>
    );
}

export default PageNotFound;