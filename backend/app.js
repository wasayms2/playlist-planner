const express = require('express');
const mysql = require('mysql');

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

app.listen('8000', () => {
    console.log('Server started on port 8000');
});
