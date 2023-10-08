import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchResults = ({searchContent}) => {
   
    const navigate = useNavigate();

    return (
        <div className='search-results'>
            {searchContent && (searchContent.map(blog => (
                <div key={blog._id}
                    onClick={() => navigate(`/blogs/blogs/${blog._id}`)}
                >
                    <div style={{ padding: '5px' }}>
                        <img src={blog.image} alt=""
                            style={{ width: '40px', height: '40px'}} 
                        />
                        <h5>{blog.title}</h5>
                    </div>
                </div>
            ))) }
        </div>
    );
}

export default SearchResults;