import React from 'react';
import Navigation from '../Components/Navigation';

function UserPlaylists({userId, setUserId}) {
    return (
        <div>
            <Navigation />
            <h2>My Playlists</h2>
        </div>
    );
}

export default UserPlaylists;
