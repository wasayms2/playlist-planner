const linreg = require('ml-regression-simple-linear');  
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
var bodyparser = require("body-parser");

// Creating connection to SQL server
const sqlDb = mysql.createConnection({
    host     : 'remotemysql.com',
    database : '50LjX7Azzy',
    user     : '50LjX7Azzy',
    password : 'Ui6sRVVDE2',
    port     : 3306,
    multipleStatements: true,
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
app.use(methodOverride('__method'))

const mongoURI = 'mongodb+srv://justin:pinsky@sqwa.cclup.mongodb.net/playlistplanner?retryWrites=true&w=majority'
const mongoDb = mongoose.createConnection(mongoURI);

let gfs;
mongoDb.once('open', () => {
    gfs = Grid(mongoDb.db, mongoose.mongo);
    gfs.collection('AddedSongs');
    console.log("connection made to mongodb successfully");
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'AddedSongs'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
//linear regression 
app.post('/linreg', (req, res) => {
    //all songs in playlist
    let id = req.body;
    let x = 'Select bpm, nrgy FROM SongsInPlaylist sip NATURAL JOIN Songs WHERE bpm IS NOT NULL AND nrgy IS NOT NULL AND PlaylistID = ' + sqlDb.escape(id.playlistID);
    sqlDb.query(x, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("nrgy data found");
            console.log(result);
            //create array for values
            const values1 = [];
            const values2 = [];

            //var length = Math.min(Object.keys(result).length, Object.keys(result2).length);

            // result.forEach((item)=> {
            //    values1.push(item['bpm']);
            // });
            let sum = 0;
            for(var i = 0; i < Object.keys(result).length; i++){
                values1.push(result[i]['bpm']);
                sum += result[i]['bpm']
                values2.push(result[i]['nrgy']);
            }
            // var sum = 0;
            // for (var i = 0; i < values1.length; i++) {
            //     sum += values1[i];
            // }
            console.log(sum);
            let avg_bpm = sum/values1.length;
            console.log(avg_bpm);
            // for(var i = 0; i < Object.keys(result).length; i++){
            //     values2.push(result[i]['nrgy']);
            // }
            
            // result2.forEach((item)=> {
            //     values2.push(item['bpm']);
            //  });

            console.log(values1);
            const regression = new linreg(values1, values2);
            console.log(values2);
            console.log("hi");
            console.log(avg_bpm);
            
            let energy = parseInt(regression.predict(parseInt(avg_bpm, 10), 10)); 
            console.log(energy);
            let score = Math.sqrt(Math.pow(energy,2)+Math.pow(avg_bpm,2))
            let sql = 'SET @score = '+sqlDb.escape(score)+'; Select title, artist, SongID, bpm, nrgy FROM Songs WHERE bpm IS NOT NULL AND nrgy IS NOT NULL ORDER BY ABS(@score - SQRT(POW(nrgy,2) + POW(bpm,2))) ASC LIMIT 3;';
            sqlDb.query(sql, id, (err, result3) => {
                if (err) {
                    throw err;
                } else {
                    console.log('predicted values');
                    res.send(result3[1]);
                }
            });
        }
    });
});

app.get('/playlist/:playlistID', (req, res) => {
    let id = req.params;
    var sql = 'SELECT * FROM Playlists NATURAL JOIN SongsInPlaylist NATURAL JOIN Songs WHERE PlaylistID =' + sqlDb.escape(id.playlistID);;
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log(`playlist ${id.playlistID} found`);
            res.send(result)
        }
    });
})

app.post('/addnewsong', (req, res) => {
    let id = req.body;
    var sql = 'INSERT INTO Songs SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("New song inserted");
            res.send(result)
        }
    });
})

app.post('/upload', upload.single('file'), (req, res) => {
    let id = req.body;
    let filename = req.file.filename;
    console.log(`${filename} uploaded!`);
    let sql = 'UPDATE Songs SET Filename ='+sqlDb.escape(filename)+' WHERE SongID =' + sqlDb.escape(id.SongID);
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log(`${filename} added to sql`);
            res.send({ 'filename': filename })
        }
    });
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exists'
            });
        }

        return res.json(files)
    })
})
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({   
          err: 'No file exists'
        });
      }
      //return res.json(file);
      const readstream = gfs.createReadStream(file.filename);
      res.type('audio/mpeg');
      readstream.pipe(res);
    });
  });

//Create new users
app.post('/users', (req, res) => {
   
    let id = req.body;
    var sql = 'INSERT INTO Users SET ?';
    sqlDb.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        } else{
            console.log("User data inserted");
            res.send(result)
        }
    });
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
    let sql = 'SELECT title, artist, SongID, Filename FROM Songs WHERE title LIKE "%' + sqlDb.escape(id.Search) + '%" or artist LIKE "%' + sqlDb.escape(id.Search) + '%"';
    sql = sql.replace(/'/g, "");
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
    var sql = 'SELECT SongId, title, artist, Filename FROM Songs s NATURAL JOIN SongsInPlaylist sp WHERE sp.PlaylistID = ' + sqlDb.escape(pid);
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
    var sql = 'DELETE FROM SongsInPlaylist WHERE SongID = ' + sqlDb.escape(id.SongID) + ' AND PlaylistID = ' + sqlDb.escape(id.PlaylistID);
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
    var sql = 'Select PlaylistID, Name From Playlists p JOIN Users u on u.UserId = p.UserID WHERE p.UserID = ' + sqlDb.escape(id.UserID);
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
app.get('/viewusers', (req, res) => {
    let sql = 'SELECT Username, COUNT(PlaylistID) FROM Users NATURAL JOIN Playlists GROUP BY UserId ORDER BY COUNT(PlaylistID) DESC LIMIT 5';
    sqlDb.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Users and playlists found');
            res.send(result)
        }
    });
});

//find list of popular songs
app.get('/popularsongs', (req, res) => {
    let sql = 'SELECT Title, COUNT(PlaylistID) FROM SongsInPlaylist NATURAL JOIN Songs GROUP BY SongId  ORDER BY COUNT(PlaylistID) DESC LIMIT 10';
    sqlDb.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('Popular songs returned');
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