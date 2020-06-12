/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The backend JavaScript file wod gen.
 */
"use strict";
const express = require("express");
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require("multer");
const app = express();

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
