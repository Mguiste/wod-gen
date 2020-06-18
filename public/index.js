/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for wod gens intro page.
 */
'use strict'
import { id, showMessage } from './modules/helper.mjs'
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
      showMessage('type a name for the profile', false)
      return
    }
    try {
      const response = await getProfile(profile)
      if (response.error) {
        showMessage('profile "' + profile + '" does not exist', false)
      } else {
        window.sessionStorage.setItem('profile', response.name)
        window.location.replace('main.html')
      }
    } catch (error) {
      showMessage('server error logging in to profile "' + profile + '"', false)
    }
  }

  async function newProfileClick () {
    const profile = id('profile').value
    if (!profile) {
      showMessage('type a name for the profile', false)
      return
    }
    try {
      const response = await postCreateProfile(profile)
      if (response.error) {
        showMessage('profile "' + profile + '" already exists', false)
      } else {
        showMessage('profile "' + profile + '" created!', true)
      }
    } catch (error) {
      showMessage('server error creating profile "' + profile + '"', false)
    }
  }
})()
