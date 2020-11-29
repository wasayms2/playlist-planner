import React, { useState } from 'react';
import Sound from 'react-sound';
import { Howl } from 'howler';

function SongBrowse({ title, artist, id, playlists, remove, playlistId, file, api }) {
    const sound = new Howl({src: `http://localhost:8000/files/${file}`, html5: true});

    let defaultVal = playlistId;
    if (!defaultVal) {
        defaultVal = playlists[0].PlaylistID
    }

    const [addPlaylistId, setAddPlaylistId] = useState(defaultVal);
    let onAdd = (e) => {
        console.log(`${id}, ${addPlaylistId}`);
        api.post(`/addtoplaylist`, {
            PlaylistID: addPlaylistId,
            SongID: id,
        }).then((res) => {
            console.log(res.data);
        });
    };
    let onDelete = (e) => {
        console.log(`${id}, ${playlistId} del`);
        api.post(`/delfromplaylist`, {
            PlaylistID: playlistId,
            SongID: id,
        }).then((res) => {
            console.log(res.data);
        });
    };

    let playSong = () => {
        if (sound.playing()) {
            sound.pause();
        } else {
            sound.play();
        }
    }

    let action = 
        <div>
            Add to playlist:
            <select style={{margin: '5px'}}
                onChange={(e => setAddPlaylistId(e.target.value))}>
                {playlists && playlists.map((playlist) => (
                    <option value={playlist.PlaylistID}>
                        {playlist.Name}
                    </option>
                ))}
            </select>
            <button onClick={onAdd} style={{margin: '5px'}}> Add! </button>
        </div>;
    
    if (remove) {
        action =
            <div>
                <button onClick={onDelete} style={{margin: '5px'}}> Remove! </button>
            </div>;
    }

    let card = <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '.5em 2em',
        border: '5px solid #151515'
        }}>
        <div>{title} (by {artist}) {typeof file === 'string' && <button onClick={playSong}> Play/Pause </button>}</div>
    <div>{action}</div>
    </div>;

    return (<>{card}</>);
}

export default SongBrowse;
