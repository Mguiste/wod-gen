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
    id('log-in').addEventListener('click', logInClick)
    id('new-profile').addEventListener('click', newProfileClick)
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  function logInClick () {
  }

  function newProfileClick () {
  }

  // -------------------- HELPER FUNCTIONS -------------------- //
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id (idName) {
    return document.getElementById(idName)
  }
})()
