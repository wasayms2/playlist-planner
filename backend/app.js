const express = require('express');
const mysql = require('mysql');
var bodyparser = require("body-parser");

// Creating connection to SQL server
const sqlDb = mysql.createConnection({
    host     : 'remotemysql.com',
    database : '50LjX7Azzy',
    user     : '50LjX7Azzy',
    password : 'Ui6sRVVDE2',
    port     : 3306,
});

// Connecting to server
sqlDb.connect((err) => {
    if (err) {
        console.log('failed :(')
        throw err;
    } else {
        console.log('Connected!')
    }
});

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

//Create new users
app.post('/users', (req, res) => {
   
    let id = req.body;
    var sql = 'INSERT INTO Users SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("User data inserted");
            console.log(sqlDb);
            res.send(result)
        }
    });
});
app.get('/users', (req, res) => {

});
//Validate user 
//fix
app.post('/findusers', (req, res) => {
    let id = req.body;
    let user = id.Username;
    let pass = id.Password;
    console.log(user);
    var sql = "SELECT UserId, Username FROM Users WHERE Username = " + sqlDb.escape(user) + "and Password = " + sqlDb.escape(pass);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Users validated');
            res.send(result)
        }
    });
});
app.post('/findsongs', (req, res) => {
    let id = req.body;
    let t = id.Title;
    let a = id.Artist;
    var sql = 'SELECT title, artist, SongID FROM Songs WHERE title = %' + sqlDb.escape(t) + '% or artist = ' + sqlDb.escape(a); 
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("songs found");
            res.send(result)
        }
    });
});
//Finding songs in playlist
app.post('/findsongsinplaylist', (req, res) => {
    let id = req.body;
    let pid = id.PlaylistID;
    var sql = 'SELECT SongId, title, artist FROM Songs s NATURAL JOIN SongsInPlaylist sp WHERE sp.PlaylistID = ' + sqlDb.escape(pid);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("songs found");
            res.send(result)
        }
    });
});
app.post('/addsongs', (req, res) => {
    let id = req.body;
    let t = id.Title;
    var sql = 'SELECT title, SongID FROM Songs WHERE title LIKE ' + sqlDb.escape(t);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("songs found");
            res.send(result)
        }
    });
});
//Creating Playlist
app.post('/createplaylist', (req, res) => {
    let id = req.body;
    var sql = 'INSERT INTO Playlists SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data created");
            res.send(result)
        }
    });
});
//Add songs to playlist
app.post('/addtoplaylist', (req, res) => {
    let id = req.body;
    var sql = 'INSERT INTO SongsInPlaylist SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data inserted");
            res.send(result)
        }
    });
});
//delete from playlist
app.post('/delfromplaylist', (req, res) => {
    let id = req.body;
    var sql = 'DELETE FROM SongsInPlaylist WHERE SongID = ' + sqlDb.escape(id.SongID);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data deleted");
            res.send(result)
        }
    });
});

//Delete Playlist
app.post('/delplaylist', (req, res) => {
    let id = req.body;
    // var toUse = id.PlaylistID;
    // var sql = 'DELETE FROM Playlists, SongsInPlaylist WHERE PlaylistID = toUse' 
    var sql = "DELETE FROM Playlists WHERE PlaylistID = " + sqlDb.escape(id.PlaylistID);

    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data deleted");
            res.send(result)
        }
    });
});

//Change Playlist Name
app.post('/changeTitle', (req, res) => {
    let id = req.body;
    var sql = "Update Playlists Set Name = " +  sqlDb.escape(id.Name) + " WHERE PlaylistID = " + sqlDb.escape(id.PlaylistID);

    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist name updated");
            res.send(result)
        }
    });
});

//Find Playlist
app.post('/findplaylist', (req, res) => {
    let id = req.body;
    var sql = 'Select p.PlaylistID, p.Name, count(UNIQUE sip.SongID) From SongsInPlaylist sip Natural Join Playlists p JOIN Users u on u.UserId = p.UserID WHERE p.UserID = ' + sqlDb.escape(id.UserID);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist found");
            res.send(result)
        }
    });
});
//find playlists in similar age
app.post('/userdob', (req, res) => {
    let id = req.body;
    var sql = 'Select DOB FROM Users WHERE DOB >= id.DOB - 3 OR DOB <= id.DOB + 3';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("USER DOB data found");
            res.send(result)
        }
    });
});
app.post('/userleaderboard', (req, res) => {
    let tid = req.body;
});
//find list of users and number of playlists each has
app.post('/viewusers', (req, res) => {
    let sql = 'SELECT Username, COUNT(PlaylistID) FROM Users NATURAL JOIN Playlists GROUP BY UserId';
    sqlDb.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Users and playlists found');
            res.send(result)
        }
    });
});
//question - should this be in the post route
app.get('/viewsongs', (req, res) => {
    let sql = 'SELECT title FROM Songs';
    sqlDb.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Songs posted');
            res.send(result)
        }
    });
});
app.post('/viewsongs', (req, res) => {
    
    res.send('GET request to the HTTP');
});
app.listen('8000', () => {
    console.log('Server started on port 8000');
});