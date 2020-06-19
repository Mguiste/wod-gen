/**
 * Name: Mason Guiste
 * Date: 6/17/20
 *
 * The test file for the index page.
 */
function shouldShowMessage (action, success) {
  action()
  cy.get('.message')
  cy.get('.message > div').should('have.class', success ? 'success' : 'error')
  cy.get('.message > div > p')
  cy.get('.message > div > button').click()
  cy.get('.message').should('not.exist')
}

Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

describe('Index page tests', () => {
  beforeEach(() => {
    cy.exec('npm run reset:database')
    cy.visit('/')
  })
  describe('Login', () => {
    it('login no profile', () => {
      shouldShowMessage(() => cy.get('#login').click(), false)
    })
    it('login profile does not exist', () => {
      cy.get('#profile').type('jackson')
      shouldShowMessage(() => cy.get('#login').click(), false)
    })
    it('login profile does exist', () => {
      cy.get('#profile').type('jackson')
      shouldShowMessage(() => cy.get('#new-profile').click(), true)
      cy.get('#login').click()
      cy.location().should(loc => assert.strictEqual(loc.pathname, '/main.html'))
      cy.getSessionStorage('profile').should('eq', 'jackson')
    })
  })
  describe('CreateProfile', () => {
    it('create profile', () => {
      cy.get('#profile').type('jackson')
      shouldShowMessage(() => cy.get('#new-profile').click(), true)
    })
    it('create existing profile', () => {
      cy.get('#profile').type('jackson')
      shouldShowMessage(() => cy.get('#new-profile').click(), true)
      shouldShowMessage(() => cy.get('#new-profile').click(), false)
    })
    it('create profile no profile', () => {
      shouldShowMessage(() => cy.get('#new-profile').click(), false)
    })
  })
  after(() => cy.exec('npm run reset:database'))
})
