/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for the main wod gens page after logging in.
 */
'use strict'
import { id, gen, showMessage } from './modules/helper.mjs'
import { getAllEquipment, getProfile, postSelectEquipment } from './modules/request.mjs'
;(function () {
  window.addEventListener('load', init)

  checkLoggedIn()

  function checkLoggedIn () {
    const profile = window.sessionStorage.getItem('profile')
    if (!profile) {
      window.location.replace('/')
    }
  }

  async function init () {
    id('profile').textContent = window.sessionStorage.getItem('name')
    id('log-out').addEventListener('click', logOutClick)
    id('profile').textContent = window.sessionStorage.getItem('profile')
    initializeEquipment()
  }

  async function initializeEquipment () {
    const htmlEquipmentContainer = id('equipment')
    try {
      const equipment = await getAllEquipment()
      const profile = await getProfile(window.sessionStorage.getItem('profile'))
      equipment.forEach(e => {
        const htmlEquipment = createEquipment(e.id, e.name, profile.equipment_ids.indexOf(e.id) !== -1)
        htmlEquipmentContainer.appendChild(htmlEquipment)
      })
    } catch (error) {
      showMessage('failed to load equipment', false)
    }
  }

  function createEquipment (id, name, selected) {
    const div = gen('div')
    div.classList.add('selectable')
    if (selected) {
      div.classList.add('selected')
    }
    div.addEventListener('click', equipmentClick)
    const p = gen('p')
    p.textContent = name
    p.id = id
    div.appendChild(p)
    return div
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  function logOutClick () {
    window.sessionStorage.removeItem('profile')
    window.location.replace('/')
  }

  async function equipmentClick (event) {
    const equipment = event.currentTarget.children[0].textContent
    try {
      const htmlEquipment = event.currentTarget
      const response = await postSelectEquipment(window.sessionStorage.getItem('profile'), equipment)
      if (response.error) {
        showMessage('profile or equipment does not exist', false)
      } else {
        htmlEquipment.classList.toggle('selected')
      }
    } catch (error) {
      showMessage('failed to select equipment "' + equipment + '"', false)
    }
  }
})()
