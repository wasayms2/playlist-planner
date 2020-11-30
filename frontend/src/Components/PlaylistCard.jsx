import React, { useState, useEffect } from 'react';
import SongBrowse from './SongBrowse';

function PlaylistCard({ id, title, api, update, viewonly, otherplaylists }) {
    const [name, setName] = useState('');
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        api.post(`/findsongsinplaylist`, {
            PlaylistID: id
        }).then((res) => {
            setSongs(res.data)
            console.log(res.data)
        });
    }, [api, id])

    let changeName = () => {
        api.post(`/changeTitle`, {
            Name: name,
            PlaylistID: id,
        }).then((res) => {
            console.log(res.data);
            if (!viewonly) {
                update();
            }
            setName('');
        });
    };

    let deletePlaylist = () => {
        api.post(`/delplaylist`, {
            PlaylistID: id,
        }).then((res) => {
            console.log(res.data);
            if (!viewonly) {
                update();
            }
        });
    }

    return (
        <div>
            <h2>
                {title} ({id})
                { !viewonly &&
                <input style={{margin: '10px'}} type='text' placeholder='New Playlist Name' value={name} onChange={(e) => (setName(e.target.value))}/> &&
                <button style={{margin: '10px'}} onClick={changeName}>
                    Edit Name
                </button> &&
                <button style={{margin: '10px'}} onClick={deletePlaylist}>
                    Delete Playlist
                </button>}
            </h2>
            {songs.map((song) => (song && <SongBrowse playlists={otherplaylists} api={api} file={song.Filename} title={song.title} artist={song.artist} id={song.SongId} remove={viewonly ? false : true} playlistId={id} />))}
            {songs.length === 0 && <p>This playlist is empty...</p>}
        </div>
    );
}

export default PlaylistCard;
