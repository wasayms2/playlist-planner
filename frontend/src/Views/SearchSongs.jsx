import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navigation from '../Components/Navigation';
import SongBrowse from '../Components/SongBrowse';

function SearchSongs({userId, setUserId}) {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');

    const instance = Axios.create({
        timeout: 1000,
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    });

    useEffect(() => {
        instance.post(`/findsongs`, {
            Title: `%${search}%`
        }).then((res) => {
            console.log(res);
            setSongs(res.data)
        });
    }, [search])

    return (
        <div>
            <Navigation />
            <input
                type='text'
                placeholder='Song Name'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            {songs.map((song) => (<SongBrowse title={song.title} id={song.SongID}/>))}
        </div>
    );
}

export default SearchSongs;
