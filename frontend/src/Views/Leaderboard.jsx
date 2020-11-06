import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';

function Leaderboard({ api }) {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        api.get(`/viewusers`).then((res) => {
            setLeaders(res.data);
            console.log(res.data);
        });
    }, [])

    return (
        <>
            <Navigation />
            <div style={{ margin: '20px' }}>
                {leaders.map((user, idx) => (<div>
                <h3><span style={{fontSize: '2em'}}>#{idx + 1}: {user.Username} </span> with {user['COUNT(PlaylistID)']} playlists</h3>
                </div>))}
            </div>
        </>
    );
}

export default Leaderboard;
