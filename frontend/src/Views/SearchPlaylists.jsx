import React from 'react';
import Navigation from '../Components/Navigation';

function SearchPlaylists({userId, setUserId}) {
    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <input
                type='text'
                placeholder='Playlist Name'
                name='plylst'
                />
        </div>
        </>
    );
}

export default SearchPlaylists;
