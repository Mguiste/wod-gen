/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for the main wod gens page after logging in.
 */

'use strict'
;(function () {
  window.addEventListener('load', init)

  checkLoggedIn()

  function checkLoggedIn () {
    const id = window.sessionStorage.getItem('id')
    if (!id) {
      window.location.replace('/')
    }
  }

  function init () {
    id('profile').textContent = window.sessionStorage.getItem('name')
    id('log-out').addEventListener('click', logOutClick)
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  function logOutClick () {
    window.sessionStorage.removeItem('id')
    window.sessionStorage.removeItem('name')
    window.sessionStorage.removeItem('equipment_ids')
    window.location.replace('/')
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
