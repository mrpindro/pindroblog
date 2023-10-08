import React from 'react';
import Blogs from './Blogs';
import Header from './Header';
import Footer from './Footer';


const Public = () => {
    return (
        <main className='main-con'>
            <Header />
            <div className="public-blogs-con">
                <Blogs />
            </div>
            <div className="public-footer">
                <Footer />
            </div>
        </main>
    );
}

export default Public;