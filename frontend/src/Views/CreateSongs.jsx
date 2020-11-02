import React from 'react';
import Navigation from '../Components/Navigation';

function CreateSongs({userId, setUserId}) {
    return (
        <div>
            <Navigation />
            <input
                type='text'
                placeholder='Title'
                name='plylst'
                />
            <input
                type='text'
                placeholder='Artist'
                name='plylst'
                />
            <input
                type='text'
                placeholder='Genre'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Year'
                name='plylst'
                />
            <input
                type='number'
                placeholder='BPM'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Energy Level'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Danceability'
                name='plylst'
                />
            <input
                type='number'
                placeholder='dB'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Liveliness'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Valence'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Duration (seconds)'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Acousticness'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Speechiness'
                name='plylst'
                />
            <input
                type='number'
                placeholder='Popularity'
                name='plylst'
                />
            
            <button type='submit'>Create New Song</button>
        </div>
    );
}

export default CreateSongs;
