import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import SongBrowse from '../Components/SongBrowse';

function SearchSongs({ api, playlists }) {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.post(`/findsongs`, {
            Title: `%${search}%`
        }).then((res) => {
            setSongs(res.data)
        });
    }, [search])

    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <input
                type='text'
                placeholder='Song Name'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            {songs.map((song) => (<SongBrowse title={song.title} id={song.SongID} key={song.SongID} playlists={playlists}/>))}
        </div>
        </>
    );
}

export default SearchSongs;
