/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The backend JavaScript file wod gen.
 */
'use strict'
const express = require('express')
const app = express()

app.get('/login', (req, res) => {
})

app.use(express.static('public'))
const PORT = process.env.PORT || 8000
app.listen(PORT)
