const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const fs = require('fs').promises

const RESOURCE_FOLDER = 'resources'
const WOD_GEN_DB = RESOURCE_FOLDER + '/wod-gen.db'
const MOVEMENTS_FILE = RESOURCE_FOLDER + '/movements.json'
const MOVEMENTS = fs.readFile(MOVEMENTS_FILE)
  .then(JSON.parse)
  .catch(() => console.error('broken'))
exports.MOVEMENTS = MOVEMENTS

/**
 * Creates a new profile with name matching the profile parameter. Does not check if profile already exists.
 * @param {string} profile the name of the profile
 * @throws {error} on any database error
 */
async function insertNewProfile (profile) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'INSERT INTO profiles (name, equipment_ids) VALUES (?, ?);'
  await db.run(qry, [profile, JSON.stringify([])])
  db.close()
}
exports.insertNewProfile = insertNewProfile

/**
 * Gets the profile from the WOD_GEN_DB file with matching name.
 * @param {string} profile name of the profile in profiles table
 * @returns {object} the entry in profiles with the matching profile and undefined if no matching entry found
 * @throws {error} on any database error
 */
async function getProfile (profile) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM profiles WHERE name = ?;'
  const result = await db.get(qry, [profile])
  if (result) {
    result.equipment_ids = JSON.parse(result.equipment_ids)
  }
  db.close()
  return result
}
exports.getProfile = getProfile

/**
 * Gets all the equipment from the "equipment" tables.
 * @returns {array} of equipment in "equipment" table
 * @throws {error} on any database error
 */
async function getAllEquipment () {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM equipment;'
  const result = await db.all(qry)
  db.close()
  return result
}
exports.getAllEquipment = getAllEquipment

/**
 * Gets a specific equipment in the equipment table.
 * @param {string} equipment name of the equipment
 * @returns {object} the equipment from the "equipment" table
 * @throws {error} on any database error
 */
async function getEquipment (equipment) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'SELECT * FROM equipment WHERE name = ?;'
  const result = await db.get(qry, [equipment])
  db.close()
  return result
}
exports.getEquipment = getEquipment

/**
 * Replaces the selected equipment ids with the passed in equipment ids for the profile.
 * @param {int} id of the profile to update
 * @param {array} equipmentIds the new equipment ids for the profile to save
 */
async function updateSelectEquipment (id, equipmentIds) {
  const db = await getDBConnection(WOD_GEN_DB)
  const qry = 'UPDATE profiles SET equipment_ids = ? WHERE id = ?;'
  await db.run(qry, [JSON.stringify(equipmentIds), id])
  db.close()
}
exports.updateSelectEquipment = updateSelectEquipment

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
