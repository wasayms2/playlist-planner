import React from 'react';
import Navigation from '../Components/Navigation';

function SearchSongs({userId, setUserId}) {
    return (
        <div>
            <Navigation />
            <input
                type='text'
                placeholder='Song Name'
                name='sngname'
                />
        </div>
    );
}

export default SearchSongs;
