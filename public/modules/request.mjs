import { checkStatus } from './helper.mjs'

async function postCreateProfile (profile) {
  const params = new window.FormData()
  params.append('profile', profile)
  const response = await window.fetch('createprofile', { method: 'POST', body: params })
  checkStatus(response)
  return await response.json()
}

async function getProfile (profile) {
  const url = createGetUrl('getprofile', ['profile'], [profile])
  const response = await window.fetch(url)
  checkStatus(response)
  return await response.json()
}

async function getAllEquipment () {
  const response = await window.fetch('allequipment')
  checkStatus(response)
  return response.json()
}

async function postSelectEquipment (profile, equipment) {
  const params = new window.FormData()
  params.append('profile', profile)
  params.append('equipment', equipment)
  const response = await window.fetch('selectequipment', { method: 'POST', body: params })
  checkStatus(response)
  return await response.json()
}

async function getCreateWorkout (profile, time, rounds) {
  const url = createGetUrl('createworkout', ['profile', 'time', 'rounds'], [profile, time, rounds])
  const response = await window.fetch(url)
  checkStatus(response)
  return await response.json()
}

function createGetUrl (endpoint, queryNames, queryValues) {
  let url = endpoint + '?'
  for (let i = 0; i < queryNames.length; i++) {
    url += queryNames[i] + '=' + queryValues[i] + '&'
  }
  return url.substr(0, url.length - 1)
}

export { postCreateProfile, getProfile, getAllEquipment, postSelectEquipment, getCreateWorkout }
