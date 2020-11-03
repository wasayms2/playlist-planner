import React from 'react';
import Navigation from '../Components/Navigation';
import PlaylistCard from '../Components/PlaylistCard';

function UserPlaylists({userId, setUserId}) {
    const playlists = [{
        id: 1,
        title: 'songssss',
        songs: [
            {
                title: 'Hey, Soul Sister',
                id: 1,
            },
            {
                title: 'Bad Romance',
                id: 4,
            },
            {
                title: 'Just the way you are',
                id: 5,
            },
        ]
    },{
        id: 2,
        title: 'yuh',
        songs: [
        ]
    },];
    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <h2>My Playlists</h2>
            {playlists.map((playlist) => (<PlaylistCard id={playlist.id} songs={playlist.songs} title={playlist.title}/>))}
        </div>
        </>
    );
}

export default UserPlaylists;
