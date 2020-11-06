import React, { useState } from 'react';
import SongBrowse from './SongBrowse';

function PlaylistCard({ id, title, songs, api, update }) {
    const [name, setName] = useState('');

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
            {songs.map((song) => (<SongBrowse title={song.title} id={song.id} remove={true} playlistId={id}/>))}
            {songs.length === 0 && <p>This playlist is empty...</p>}
        </div>
    );
}

export default PlaylistCard;
