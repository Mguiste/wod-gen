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

  async function init () {
    id('profile').textContent = window.sessionStorage.getItem('name')
    id('log-out').addEventListener('click', logOutClick)
    const htmlEquipment = id('equipment')
    const equipment = await getAllEquipment()
    equipment.forEach(e => {
      const div = gen('div')
      div.classList.add('selectable')
      div.addEventListener('click', equipmentClick)
      const p = gen('p')
      p.textContent = e
      div.appendChild(p)
      htmlEquipment.appendChild(div)
    })
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  function logOutClick () {
    window.sessionStorage.removeItem('id')
    window.sessionStorage.removeItem('name')
    window.sessionStorage.removeItem('equipment_ids')
    window.location.replace('/')
  }

  async function equipmentClick (event) {
    const equipment = event.currentTarget.children[0].textContent
  }

  // -------------------- API REQUEST FUNCTIONS -------------------- //
  async function getAllEquipment () {
    const response = await window.fetch('allequipment')
    checkStatus(response)
    return response.json()
  }

  // -------------------- HELPER FUNCTIONS -------------------- //
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
   * Generates a new document element with the given tagName.
   * @param {string} tagName the name of the tag to create
   * @returns {object} DOM created object with the given tag.
   */
  function gen (tagName) {
    return document.createElement(tagName)
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
