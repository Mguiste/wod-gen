/**
 * Name: Mason Guiste
 * Date: 6/17/20
 *
 * The test file for the main page.
 */
Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value)
  })
})

describe('Main page tests', () => {
  beforeEach(() => {
    cy.exec('npm run reset:database')
    cy.request('POST', '/createprofile', { profile: 'jackson' })
    cy.setSessionStorage('profile', 'jackson')
    cy.visit('/main.html')
  })
  it('log out', () => {
    cy.get('#log-out').click()
    cy.location().should(loc => assert.strictEqual(loc.pathname, '/'))
    cy.getSessionStorage('profile').should('be.null')
  })
  describe('EquipmentList', () => {
    it('displaying equipment', () => {
      cy.get('#equipment').children().should('not.have.length', 0)
    })
    it('each equipment has "selectable" class', () => {
      cy.get('#equipment').children().should('have.class', 'selectable')
    })
    it('selected equipment for profile shown on load', () => {
      cy.request('POST', '/selectequipment', { profile: 'jackson', equipment: 'barbells' })
      cy.visit('/main.html')
      cy.get('#equipment').children().then(children => children[0]).should('have.class', 'selected')
    })
  })
  describe('SelectEquipment', () => {
    it('select equipment', () => {
      cy.get('#equipment').children().then(children => children[0]).click()
      cy.get('#equipment').children().then(children => children[0]).should('have.class', 'selected')
      cy.request('GET', '/getprofile?profile=jackson')
        .then(response => assert.deepEqual(response.body.equipment_ids, [1]))
    })
    it('reselect equipment', () => {
      cy.get('#equipment').children().then(children => children[0]).click()
      cy.get('#equipment').children().then(children => children[0]).click()
      cy.get('#equipment').children().then(children => children[0]).should('not.have.class', 'selected')
      cy.request('GET', '/getprofile?profile=jackson')
        .then(response => assert.deepEqual(response.body.equipment_ids, []))
    })
  })
  after(() => cy.exec('npm run reset:database'))
})
