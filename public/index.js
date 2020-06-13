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
    const profile = id('profile').value
    if (!profile) {
      displayMessage('Error: type a name for the profile')
      return
    }
    try {
      const response = await getLogin(profile)
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

  // -------------------- API REQUEST FUNCTIONS -------------------- //
  async function postCreateProfile (profile) {
    const params = new window.FormData()
    params.append('profile', profile)
    const response = await window.fetch('createprofile', { method: 'POST', body: params })
    checkStatus(response)
    return await response.json()
  }

  async function getLogin (profile) {
    const response = await window.fetch('login?profile=' + profile)
    checkStatus(response)
    return await response.json()
  }

  // -------------------- HELPER FUNCTIONS -------------------- //
  function displayMessage (msg) {
    const htmlMsg = id('usr-msg')
    htmlMsg.textContent = msg
    show(htmlMsg)
    setTimeout(() => hide(htmlMsg), 3000)
  }

  /**
   * Removes the hidden class from the element making it visible to the user. If the element
   * already does not have the hidden class method does nothing.
   * @param {object} element DOM object you want the hidden class removed from
   */
  function show (element) {
    element.classList.remove('hidden')
  }

  /**
   * Adds the hidden class from the element making it invisible to the user. If the element
   * already has the hidden class method does nothing.
   * @param {object} element DOM object you want the hidden class added to
   */
  function hide (element) {
    element.classList.add('hidden')
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
