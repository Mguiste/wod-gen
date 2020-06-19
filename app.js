/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The backend JavaScript file wod gen.
 */
'use strict'
const resource = require('./resource.js')
const express = require('express')
const multer = require('multer')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(multer().none())

app.post('/createprofile', async (req, res) => {
  const profileName = req.body.profile
  if (!profileName) {
    res.status(400).type('text').send('Error: missing body parameter "profile"')
    return
  }
  try {
    let profile = await resource.getProfile(profileName)
    if (profile) {
      res.status(200).json({
        error: 'Profile ' + profileName + ' already exists'
      })
      return
    } else {
      await resource.insertNewProfile(profileName)
      profile = await resource.getProfile(profileName)
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
    const profile = await resource.getProfile(profileName)
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
    const equipment = await resource.getAllEquipment()
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
    let profile = await resource.getProfile(profileName)
    if (!profile) {
      res.status(200).json({
        error: 'Profile ' + profileName + ' does not exist'
      })
      return
    }
    const equipment = await resource.getEquipment(equipmentName)
    if (!equipment) {
      res.status(200).json({
        error: 'Equipment ' + equipmentName + ' does not exist'
      })
    }
    await selectEquipment(profileName, equipment.id)
    profile = await resource.getProfile(profileName)
    res.status(200).json({
      profile: profileName,
      equipment: equipmentName
    })
  } catch (error) {
    res.status(500).type('text').send('Error: database error on server')
  }
})

app.get('/createworkout', async (req, res) => {
  const profileName = req.query.profile
  if (!profileName) {
    res.status(400).type('text').send('Error: missing query parameter "profile"')
    return
  }
  try {
    const profile = await resource.getProfile(profileName)
    if (!profile) {
      res.status(200).json({
        error: 'Profile ' + profileName + ' does not exist'
      })
      return
    }
    const workout = await createWorkout(profile.equipment_ids)
    res.status(200).json(workout)
  } catch (error) {
    console.log(error)
    res.status(500).type('text').send('Error: database error on server')
  }
})

async function createWorkout (equipmentIds) {
  const movements = await getPossibleMovements(equipmentIds)
  return {
    type: 'AMRAP',
    time: 15,
    movements: movements
  }
}

async function getPossibleMovements (equipmentIds) {
  const equipmentNames = (await resource.getAllEquipment())
    .filter(elem => equipmentIds.indexOf(elem.id) !== -1)
    .map(elem => elem.name)
  const result = []
  ;(await resource.MOVEMENTS).forEach(movement => {
    if (!movement.requires || equipmentNames.indexOf(movement.requires) !== -1) {
      result.push(movement)
    }
  })
  return result
}

async function selectEquipment (profileName, eid) {
  const profile = await resource.getProfile(profileName)
  const equipmentIds = profile.equipment_ids
  // toggle selected status of id
  if (equipmentIds.indexOf(eid) === -1) {
    equipmentIds.push(eid)
  } else {
    equipmentIds.splice(equipmentIds.indexOf(eid), 1)
  }
  await resource.updateSelectEquipment(profile.id, equipmentIds)
}

app.use(express.static('public'))
const PORT = process.env.PORT || 8000
app.listen(PORT)
