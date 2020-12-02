import React, { useState, useEffect } from 'react';
import SongBrowse from './SongBrowse';

function PlaylistCard({ id, title, api, update, viewonly, otherplaylists }) {
    const [name, setName] = useState('');
    const [songs, setSongs] = useState([]);
    const [recommended, setRecommended] = useState(undefined);

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
        <div style={{
            position: 'relative',
            padding: '2em',
        }}>
            <h2>
                {title} ({id})
                { !viewonly &&
                <input style={{margin: '10px'}} type='text' placeholder='New Playlist Name' value={name} onChange={(e) => (setName(e.target.value))}/>}
                { !viewonly && <button style={{margin: '10px'}} onClick={changeName}>
                    Edit Name
                </button>}
                { !viewonly && <button style={{margin: '10px'}} onClick={deletePlaylist}>
                    Delete Playlist
                </button>}
            </h2>
            {songs.map((song) => (song && <SongBrowse playlists={otherplaylists} api={api} file={song.Filename} title={song.title} artist={song.artist} id={song.SongId} remove={viewonly ? false : true} playlistId={id} />))}
            {songs.length === 0 && <p>This playlist is empty...</p>}
            {!viewonly && <button style={{right: '2.5em'}} onClick={() => {
                api.post('/linreg', {
                    'playlistID': id
                }).then((res) => {
                    setRecommended(res.data)
                })
                console.log(viewonly)
                console.log(!viewonly)
                console.log(typeof viewonly)
            }}>Find similar songs!</button>}
            {recommended && recommended.map((song) => (song && <SongBrowse playlists={otherplaylists} api={api} file={song.Filename} title={song.title} artist={song.artist} id={song.SongID} playlistId={id} />))}
        </div>
    );
}

export default PlaylistCard;
