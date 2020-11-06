import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import SongBrowse from '../Components/SongBrowse';

function SearchSongs({ api, playlists, setPlaylists, userId }) {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');

    let updatePlaylists = () =>{
        api.post(`/findplaylist`, {
            UserID: userId
        }).then((res) => {
            setPlaylists(res.data)
        });
    };

    useEffect(() => {
        api.post(`/findsongs`, {
            Search: search
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
            {songs && playlists.length > 0 ? songs.map((song) => (<SongBrowse api={api} title={song.title} artist={song.artist} id={song.SongID} key={song.SongID} playlists={playlists}/>))
            : songs.map((song) => (<SongBrowse api={api} title={song.title} artist={song.artist} id={song.SongID} key={song.SongID} playlists={[{PlaylistID: 0}]}/>))}
        </div>
        </>
    );
}

export default SearchSongs;
