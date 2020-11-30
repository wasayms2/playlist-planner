import React from 'react';
import { Link } from "react-router-dom";
import '../Style/navigation.scss'

function Navigation() {
    return (
        <header className="Navigation">
            <div className="black-container">
                <div className="title">
                    <Link to="/">
                        <h1>Playlist Planner</h1>
                    </Link>
                </div>
                <div className="chapter">
                    <h1>CS 411</h1>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/leaderboard">Leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/playlists">My Playlists</Link>
                    </li>
                    <li>
                        <Link to="/playlist-search">Search Playlists</Link>
                    </li>
                    <li>
                        <Link to="/song-search">Search Songs</Link>
                    </li>
                    <li>
                        <Link to="/new-song">Create Songs</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;