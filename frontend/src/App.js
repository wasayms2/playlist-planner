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

  let updatePlaylists = () =>{
    api.post(`/findplaylist`, {
        UserID: userId
    }).then((res) => {
        setPlaylists(res.data)
        console.log(res.data)
    });
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing userId={userId} setUserId={setUserId} api={api}/>
          </Route>
          <Route path="/playlists">
            <UserPlaylists userId={userId} playlists={playlists} setPlaylists={setPlaylists} api={api} updatePlaylists={updatePlaylists}/>
          </Route>
          <Route path="/playlist-search">
            <SearchPlaylists userId={userId} setUserId={setUserId} api={api} updatePlaylists={updatePlaylists}/>
          </Route>
          <Route path="/song-search">
            <SearchSongs userId={userId} setUserId={setUserId} api={api} playlists={playlists} updatePlaylists={updatePlaylists}/>
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
