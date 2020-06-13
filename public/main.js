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

  function checkLoggedIn() {
    let id = window.sessionStorage.getItem('id')
    if (!id) {
      window.location.replace('/')
    }
  }

  function init () {
    id('profile').textContent = window.sessionStorage.getItem('name')
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
