/**
 * Name: Mason Guiste
 * Date: 6/11/20
 *
 * The frontend JavaScript file for the main wod gens page after logging in.
 */
'use strict'
import { id, gen, showMessage, show } from './modules/helper.mjs'
import { getAllEquipment, getProfile, postSelectEquipment, getCreateWorkout } from './modules/request.mjs'
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
    id('create-workout').addEventListener('click', createWorkoutClick)
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

  function displayWorkout (workout) {
    id('workout-type').textContent = workout.type

    const movementsHtml = id('movements')
    movementsHtml.innerHTML = ''
    workout.movements.forEach(movement => {
      const containerHtml = gen('div')
      const movementHtml = gen('code')
      const scaleHtml = gen('code')

      movementHtml.textContent = movement.name
      scaleHtml.textContent = movement.reps + ' ' + movement.unit
      if (movement.weight) {
        scaleHtml.textContent += ' (' + movement.weight + ')'
      }

      containerHtml.appendChild(movementHtml)
      containerHtml.appendChild(scaleHtml)
      movementsHtml.appendChild(containerHtml)
    })

    show(id('workout'))
  }

  // -------------------- EVENT HANDLER FUNCTIONS -------------------- //
  function logOutClick () {
    window.sessionStorage.removeItem('profile')
    window.location.replace('/')
  }

  async function createWorkoutClick () {
    const profile = window.sessionStorage.getItem('profile')
    try {
      const workout = await getCreateWorkout(profile, 15, 5)
      displayWorkout(workout)
    } catch (error) {
      console.log(error)
    }
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
