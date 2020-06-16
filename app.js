/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The backend JavaScript file wod gen.
 */
'use strict'
const express = require('express')
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const multer = require('multer')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(multer().none())

const WOD_GEN_DB = 'resources/wod-gen.db'

app.post('/createprofile', async (req, res) => {
  const profileName = req.body.profile
  if (!profileName) {
    res.status(400).type('text').send('Error: missing body parameter "profile"')
    return
  }
  try {
    let profile = await getProfile(profileName)
    if (profile) {
      res.status(200).json({
        error: 'Profile ' + profileName + ' already exists'
      })
      return
    } else {
      await createNewProfile(profileName)
      profile = await getProfile(profileName)
      res.status(200).json(profile)
      return
    }
  } catch (error) {
    res.status(500).type('text').send('Error: database error on server')
  }
})

app.get('/getprofile', async (req, res) => {
  const profileName = req.query.profile
  if (!profileName) {
    res.status(400).type('text').send('Error: missing query parameter "profile"')
    return
  }
  try {
    const profile = await getProfile(profileName)
    if (profile) {
      res.status(200).json(profile)
      return
    } else {
      res.status(200).json({
        error: 'Profile ' + profileName + ' does not exist'
      })
      return
    }
  } catch (error) {
    res.status(500).type('text').send('Error: database error on server')
  }
})

app.get('/allequipment', async (req, res) => {
  try {
    const equipment = await getAllEquipment()
    res.status(200).json(equipment)
  } catch (error) {
    res.status(500).type('text').send('Error: database error on server')
  }
})

app.post('/selectequipment', async (req, res) => {
  const profileName = req.body.profile
  const equipmentName = req.body.equipment
  if (!profileName || !equipmentName) {
    res.status(400).type('text').send('Error: missing body parameter "profile" and/or "equipment"')
    return
  }
  try {
    let profile = await getProfile(profileName)
    if (!profile) {
      res.status(200).json({
        error: 'Profile ' + profileName + ' does not exist'
      })
      return
    }
    const equipment = await getEquipment(equipmentName)
    if (!equipment) {
      res.status(200).json({
        error: 'Equipment ' + equipmentName + ' does not exist'
      })
    }
    await selectEquipment(profileName, equipment.id)
    profile = await getProfile(profileName)
    res.status(200).json({
      profile: profileName,
      equipment: equipmentName
    })
  } catch (error) {
    res.status(500).type('text').send('Error: database error on server')
  }
})

/**
 * Gets the profile from the WOD_GEN_DB file with matching name.
 * @param {string} profile name of the profile in profiles table
 * @returns {object} the entry in profiles with the matching profile and undefined if no matching entry found
 * @throws {error} on any server error
 */
async function getProfile (profile) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM profiles WHERE name = ?;'
  const result = await db.get(qry, [profile])
  if (result) {
    result.equipment_ids = JSON.parse(result.equipment_ids)
  }
  return result
}

/**
 * Creates a new profile with name matching the profile parameter. Does not check if profile already exists.
 * @param {string} profile the name of the profile
 * @throws {error} on any server error
 */
async function createNewProfile (profile) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'INSERT INTO profiles (name, equipment_ids) VALUES (?, ?);'
  await db.run(qry, [profile, JSON.stringify([])])
}

async function selectEquipment (profileName, id) {
  const profile = await getProfile(profileName)
  const equipmentIds = profile.equipment_ids
  if (equipmentIds.indexOf(id) === -1) {
    equipmentIds.push(id)
  } else {
    equipmentIds.splice(equipmentIds.indexOf(id), 1)
  }
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'UPDATE profiles SET equipment_ids = ? WHERE id = ?;'
  await db.run(qry, [JSON.stringify(equipmentIds), profile.id])
}

async function getAllEquipment () {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM equipment;'
  return await db.all(qry)
}

async function getEquipment (equipment) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM equipment WHERE name = ?;'
  return await db.get(qry, [equipment])
}

/**
 * Establishes a database connection to the provided file database and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @param {string} file the path of the file to connect to
 * @returns {object} The database object for the connection.
 * @throws {error} on any database connection error
 */
async function getDBConnection (file) {
  const db = await sqlite.open({
    filename: file,
    driver: sqlite3.Database
  })
  return db
}

app.use(express.static('public'))
const PORT = process.env.PORT || 8000
app.listen(PORT)
