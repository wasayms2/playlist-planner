import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import PlaylistCard from '../Components/PlaylistCard';

function SearchPlaylists({api, playlists, setPlaylists, userId}) {
    const [playlistid, setPlaylistid] = useState('');
    const [playlistInfo, setPlaylistInfo] = useState(undefined)

    let updatePlaylists = () =>{
        api.post(`/findplaylist`, {
            UserID: userId
        }).then((res) => {
            setPlaylists(res.data)
        });
    };

    useEffect(() => {
        updatePlaylists();
    }, []);

    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <input
                type='number'
                placeholder='Playlist Name'
                name='plylst'
                value={playlistid}
                onChange={(e) => setPlaylistid(e.target.value)}
                />
            <button onClick={() => {
                api.get(`/playlist/${playlistid}`).then((res) => {
                    if (res.data.length > 0) {
                        setPlaylistInfo({
                            'id': res.data[0].PlaylistID,
                            'title': res.data[0].Name,
                        })
                    }
                })
            }}>Find by ID!</button>
        </div>
            {playlistInfo && <PlaylistCard id={playlistInfo.id} title={playlistInfo.title} api={api} viewonly={true} otherplaylists={playlists}/>}
        </>
    );
}

export default SearchPlaylists;
