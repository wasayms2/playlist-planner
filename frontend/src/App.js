import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Landing from './Views/Landing';
import UserPlaylists from './Views/UserPlaylists';
import SearchPlaylists from './Views/SearchPlaylists';
import SearchSongs from './Views/SearchSongs';
import CreateSongs from './Views/CreateSongs';
import './App.css';

function App() {
  const [userId, setUserId] = useState(undefined);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing userId={userId} setUserId={setUserId}/>
          </Route>
          <Route path="/playlists">
            <UserPlaylists userId={userId} setUserId={setUserId}/>
          </Route>
          <Route path="/playlist-search">
            <SearchPlaylists userId={userId} setUserId={setUserId}/>
          </Route>
          <Route path="/song-search">
            <SearchSongs userId={userId} setUserId={setUserId}/>
          </Route>
          <Route path="/new-song">
            <CreateSongs userId={userId} setUserId={setUserId}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
