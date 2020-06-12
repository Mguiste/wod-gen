/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The backend JavaScript file wod gen.
 */
'use strict'
const express = require('express')
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const app = express()

app.get('/login', (req, res) => {
})

app.post('/createuser', (req, res) => {
})

/**
 * Establishes a database connection to the provided file database and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @param {string} file the path of the file to connect to
 * @returns {object} The database object for the connection.
 * @throws {error} on any database connection error
 */
async function getDBConnection(file) {
  const db = await sqlite.open({
    filename: file,
    driver: sqlite3.Database
  });
  return db;
}

app.use(express.static('public'))
const PORT = process.env.PORT || 8000
app.listen(PORT)
