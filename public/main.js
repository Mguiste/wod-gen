/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for the main wod gens page after logging in.
 */
'use strict'
import { id, gen } from './modules/helper.mjs'
import { getAllEquipment } from './modules/request.mjs'
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
})()
