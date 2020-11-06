import React, { useState, useEffect } from 'react';
import SongBrowse from './SongBrowse';

function PlaylistCard({ id, title, api, update }) {
    const [name, setName] = useState('');
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        api.post(`/findsongsinplaylist`, {
            PlaylistID: id
        }).then((res) => {
            setSongs(res.data)
            console.log(res.data)
        });
    }, [])

    let changeName = () => {
        api.post(`/changeTitle`, {
            Name: name,
            PlaylistID: id,
        }).then((res) => {
            console.log(res.data);
            update();
            setName('');
        });
    };

    let deletePlaylist = () => {
        api.post(`/delplaylist`, {
            PlaylistID: id,
        }).then((res) => {
            console.log(res.data);
            update();
        });
    }

    return (
        <div>
            <h2>
                {title}
                <input style={{margin: '10px'}} type='text' placeholder='New Playlist Name' value={name} onChange={(e) => (setName(e.target.value))}/>
                <button style={{margin: '10px'}} onClick={changeName}>
                    Edit Name
                </button>
                <button style={{margin: '10px'}} onClick={deletePlaylist}>
                    Delete Playlist
                </button>
            </h2>
            {songs.map((song) => (song && <SongBrowse api={api} title={song.title} artist={song.artist} id={song.SongId} remove={true} playlistId={id}/>))}
            {songs.length === 0 && <p>This playlist is empty...</p>}
        </div>
    );
}

export default PlaylistCard;
