/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for wod gens intro page.
 */

'use strict'
;(function () {
  window.addEventListener('load', init)

  function init () {
    id('login').addEventListener('click', logInClick)
    id('new-profile').addEventListener('click', newProfileClick)
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  async function logInClick () {
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

  // -------------------- API REQUEST FUNCTIONS -------------------- //
  async function postCreateProfile (profile) {
    const params = new FormData()
    params.append('profile', profile)
    const response = await fetch('createprofile', { method: 'POST', body: params })
    checkStatus(response)
    return await response.json()
  }

  // -------------------- HELPER FUNCTIONS -------------------- //
  function displayMessage (msg) {
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus (response) {
    if (response.ok) {
      return response
    } else {
      throw Error('Error in request: ' + response.statusText)
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id (idName) {
    return document.getElementById(idName)
  }
})()
