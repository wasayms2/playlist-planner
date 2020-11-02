import React from 'react';
import Navigation from '../Components/Navigation';

function SearchPlaylists({userId, setUserId}) {
    return (
        <div>
            <Navigation />
            <input
                type='text'
                placeholder='Playlist Name'
                name='plylst'
                />
        </div>
    );
}

export default SearchPlaylists;
