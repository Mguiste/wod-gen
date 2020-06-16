import { checkStatus } from './helper.mjs'

async function postCreateProfile (profile) {
  const params = new window.FormData()
  params.append('profile', profile)
  const response = await window.fetch('createprofile', { method: 'POST', body: params })
  checkStatus(response)
  return await response.json()
}

async function getProfile (profile) {
  const response = await window.fetch('getProfile?profile=' + profile)
  checkStatus(response)
  return await response.json()
}

async function getAllEquipment () {
  const response = await window.fetch('allequipment')
  checkStatus(response)
  return response.json()
}

export { postCreateProfile, getProfile, getAllEquipment }
