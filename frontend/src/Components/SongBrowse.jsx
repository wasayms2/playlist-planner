import React, { useState } from 'react';

function SongBrowse({ title, id, playlists }) {
    playlists = [{
        id: 1,
        name: 'songssss'
    },{
        id: 2,
        name: 'yuh'
    },];
    const [playlistId, setPlaylistId] = useState(playlists[0].id);
    let onClick = (e) => (console.log(playlistId));

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '.5em 2em',
            border: '5px solid #151515'
            }}>
            <div>{title}</div>
            <div>
                Add to playlist:
                <select style={{margin: '5px'}}
                    onChange={(e => setPlaylistId(e.target.value))}>
                    {playlists.map((playlist) => (
                        <option value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button onClick={onClick} style={{margin: '5px'}}> Add! </button>
            </div>
        </div>
    );
}

export default SongBrowse;
