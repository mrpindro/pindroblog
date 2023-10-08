import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import getBlogsWithAxios from '../hooks/getBlogsWithAxios';

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [displayResults, setDisplayResults] = useState(false);

    const blogs = getBlogsWithAxios.data;

    useEffect(() => {
        if (search) {
            setDisplayResults(true)
        } else {
            setDisplayResults(false);
        }
    }, [search, setDisplayResults]);

    return (
        <div className='searchpage'>
            <SearchInput 
                search={search} setSearch={(e) => setSearch(e.target.value)} 
            />
            <hr />
            {displayResults && (
                <SearchResults 
                    searchContent={blogs.filter(blog => (
                        (blog.title).toLowerCase()).includes(search.toLowerCase()))
                    } 
                />
            )}
        </div>
    );
}

export default SearchPage;