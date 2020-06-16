/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for wod gens intro page.
 */
'use strict'
import { id, show, hide } from './modules/helper.mjs'
import { postCreateProfile, getProfile } from './modules/request.mjs'
;(function () {
  window.addEventListener('load', init)

  function init () {
    id('login').addEventListener('click', logInClick)
    id('new-profile').addEventListener('click', newProfileClick)
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  async function logInClick () {
    const profile = id('profile').value
    if (!profile) {
      displayMessage('Error: type a name for the profile')
      return
    }
    try {
      const response = await getProfile(profile)
      if (response.error) {
        displayMessage('Error: profile "' + profile + '" does not exist')
      } else {
        window.sessionStorage.setItem('id', response.id)
        window.sessionStorage.setItem('name', response.name)
        window.sessionStorage.setItem('equipment_ids', JSON.stringify(response.equipment_ids))
        window.location.replace('main.html')
      }
    } catch (error) {
      displayMessage('Error: server error loggin in to profile "' + profile + '"')
    }
  }

  async function newProfileClick () {
    const profile = id('profile').value
    if (!profile) {
      displayMessage('Error: type a name for the profile')
      return
    }
    try {
      const response = await postCreateProfile(profile)
      if (response.error) {
        displayMessage('Profile "' + profile + '" already exists')
      } else {
        displayMessage('Profile "' + profile + '" created!')
      }
    } catch (error) {
      displayMessage('Error: server error creating profile "' + profile + '"')
    }
  }

  function displayMessage (msg) {
    const htmlMsg = id('usr-msg')
    htmlMsg.textContent = msg
    show(htmlMsg)
    setTimeout(() => hide(htmlMsg), 3000)
  }
})()
