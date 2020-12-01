import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import PlaylistCard from '../Components/PlaylistCard';
import { toISOStringLocal } from '../Utils/GetDate';

function UserPlaylists({ userId, api, playlists, setPlaylists }) {
    const [name, setName] = useState('');

    let updatePlaylists = () =>{
        api.post(`/findplaylist`, {
            UserID: userId
        }).then((res) => {
            setPlaylists(res.data)
            console.log(res.data)
        });
    };
    
    useEffect(() => {
        updatePlaylists();
    }, []);

    let createPlaylist = () => {
        api.post(`/createplaylist`, {
            Name: name,
            Date: toISOStringLocal(new Date()),
            UserID: userId,
        }).then((res) => {
            console.log(res.data);
            updatePlaylists();
            setName('');
        });
    };

    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <h2>My Playlists</h2>
            New Playlist:
            <input style={{margin: '10px'}} type='text' placeholder='Playlist Name' value={name} onChange={(e) => (setName(e.target.value))} />
            <button style={{margin: '10px'}} onClick={createPlaylist}>
                Create!
            </button>
            {playlists && playlists.map((playlist, idx) => (<PlaylistCard otherplaylists={[playlists[idx]]} id={playlist.PlaylistID} songs={[]} title={playlist.Name} api={api} update={updatePlaylists}/>))}
        </div>
        </>
    );
}

export default UserPlaylists;
