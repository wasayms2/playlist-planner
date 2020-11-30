import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from 'axios';
import Landing from './Views/Landing';
import UserPlaylists from './Views/UserPlaylists';
import SearchPlaylists from './Views/SearchPlaylists';
import SearchSongs from './Views/SearchSongs';
import CreateSongs from './Views/CreateSongs';
import Leaderboard from './Views/Leaderboard';
import './App.css';

function App() {
  const [userId, setUserId] = useState(undefined);
  const [username, setUsername] = useState('');
  const [playlists, setPlaylists] = useState([]);

  const api = Axios.create({
    timeout: 5000,
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    credentials: 'same-origin'
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing userId={userId} setUserId={setUserId} api={api} username={username} setUsername={setUsername}/>
          </Route>
          <Route path="/playlists">
            <UserPlaylists userId={userId} playlists={playlists} setPlaylists={setPlaylists} api={api}/>
          </Route>
          <Route path="/playlist-search">
            <SearchPlaylists userId={userId} setUserId={setUserId} playlists={playlists} setPlaylists={setPlaylists} api={api}/>
          </Route>
          <Route path="/song-search">
            <SearchSongs userId={userId} setUserId={setUserId} api={api} playlists={playlists} setPlaylists={setPlaylists}/>
          </Route>
          <Route path="/new-song">
            <CreateSongs userId={userId} setUserId={setUserId} api={api}/>
          </Route>
          <Route path="/leaderboard">
            <Leaderboard userId={userId} setUserId={setUserId} api={api}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
