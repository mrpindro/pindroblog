import React from 'react';
import '../styles/sidebars.css';

const SearchInput = ({setSearch, search}) => {
    
    return (
        <div className='search-input-con'>
            <form onSubmit={(e) => e.preventDefault()} className='search-form'>
                <div className="form-group">
                    <label htmlFor="search"></label>
                    <input 
                        type="text" 
                        id='search'
                        placeholder='Search Blog'
                        value={search}
                        onChange={setSearch}
                        className='form-control'
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchInput;