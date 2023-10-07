import React from 'react';
import Blogs from './Blogs';
import Header from './Header';


const Public = () => {
    return (
        <main className='main-con'>
            <Header />
            <div className="public-blogs-con">
                <Blogs />
            </div>
        </main>
    );
}

export default Public;