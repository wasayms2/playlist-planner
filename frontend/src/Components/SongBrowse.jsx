import React, { useState } from 'react';

function SongBrowse({ title, id, playlists, remove, playlistId }) {
    playlists = [{
        id: 1,
        name: 'songssss'
    },{
        id: 2,
        name: 'yuh'
    },];
    const [addPlaylistId, setAddPlaylistId] = useState(playlists[0].id);
    let onAdd = (e) => (console.log(`${id}, ${addPlaylistId}`));
    let onDelete = (e) => (console.log(`${id}, ${playlistId}`));

    let action = 
        <div>
            Add to playlist:
            <select style={{margin: '5px'}}
                onChange={(e => setAddPlaylistId(e.target.value))}>
                {playlists.map((playlist) => (
                    <option value={playlist.id}>
                        {playlist.name}
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
