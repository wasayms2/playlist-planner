import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import SongBrowse from '../Components/SongBrowse';

function SearchSongs({ api, playlists, updatePlaylists }) {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.post(`/findsongs`, {
            Title: `%${search}%`
        }).then((res) => {
            setSongs(res.data)
        });
    }, [search])

    useEffect(() => {
        updatePlaylists();
    }, []);

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
            {songs && playlists.length > 0 ? songs.map((song) => (<SongBrowse api={api} title={song.title} id={song.SongID} key={song.SongID} playlists={playlists}/>))
            : songs.map((song) => (<SongBrowse api={api} title={song.title} id={song.SongID} key={song.SongID} playlists={[{PlaylistID: 0}]}/>))}
        </div>
        </>
    );
}

export default SearchSongs;
