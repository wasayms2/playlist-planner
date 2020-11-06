import React, { useState } from 'react';

function SongBrowse({ title, id, playlists, remove, playlistId, api }) {
    const [addPlaylistId, setAddPlaylistId] = useState(playlists[0].PlaylistID);
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
        console.log(`${id}, ${playlistId}`);
    };

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

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '.5em 2em',
            border: '5px solid #151515'
            }}>
            <div>{title}</div>
            {action}
        </div>
    );
}

export default SongBrowse;
