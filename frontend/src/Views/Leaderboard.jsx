import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';

function Leaderboard({ api }) {
    const [leaders, setLeaders] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        api.get(`/viewusers`).then((res) => {
            setLeaders(res.data);
            console.log(res.data);
        });
        api.get(`/popularsongs`).then((res) => {
            setSongs(res.data);
            console.log(res.data);
        });
    }, [])

    return (
        <>
            <Navigation />
            <div style={{ margin: '20px' }}>
                <h1 style={{color: '#0f0'}}>Top Users:</h1>
                {leaders.slice(0,10).map((user, idx) => (<div>
                <h3>
                    <span style={{fontSize: '1.5em'}}>#{idx + 1}: <span style={{color: '#cfc'}}>{user.Username}</span> </span> with {user['COUNT(PlaylistID)']} playlists
                </h3>
                </div>))}
                <h1 style={{color: '#0f0'}}>Most Popular Songs: </h1>
                {songs.slice(0,10).map((song, idx) => (<div>
                <h3>
                    <span style={{fontSize: '1.5em'}}>#{idx + 1}: <span style={{color: '#cfc'}}>{song.Title}</span> </span> in {song['COUNT(PlaylistID)']} playlists
                </h3>
                </div>))}
            </div>
        </>
    );
}

export default Leaderboard;
