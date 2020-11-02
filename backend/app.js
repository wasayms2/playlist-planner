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
app.get('/users', (req, res) => {
    let sql = 'SELECT UserID FROM Users';
    sqlDb.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Users validated');
            res.send(result)
        }
    });
});
//Finding songs
app.post('/findsongs', (req, res) => {
    let id = req.body;
    var sql = 'SELECT title FROM Songs WHERE title LIKE id';
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
    var sql = 'INSERT INTO SongsInPlaylist(SongID) SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data inserted");
            res.send(result)
        }
    });
});
//Delete Playlist
app.post('/deleteplaylist', (req, res) => {
    let id = req.body;
    var sql = 'DELETE FROM Playlists, SongsInPlaylist WHERE PlaylistID = id.PlaylistID';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("Playlist data deleted");
            res.send(result)
        }
    });
});
//Find Playlist
app.post('/findplaylist', (req, res) => {
    let id = req.body;
    var sql = 'Select PlaylistID From Playlists p JOIN Users u on u.UserID = p.UserID WHERE PlaylistID = id.PlaylistID ';
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
