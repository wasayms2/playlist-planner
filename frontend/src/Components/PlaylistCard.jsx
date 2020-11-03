import React from 'react';
import SongBrowse from './SongBrowse';

function PlaylistCard({ id, title, songs }) {
    return (
        <div>
            <h2>{title}</h2>
            {songs.map((song) => (<SongBrowse title={song.title} id={song.id} remove={true} playlistId={id}/>))}
            {songs.length == 0 && <p>This playlist is empty...</p>}
        </div>
    );
}

export default PlaylistCard;
