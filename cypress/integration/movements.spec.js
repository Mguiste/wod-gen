/**
 * Name: Mason Guiste
 * Date: 6/20/20
 *
 * The test file for verifying movements.json is correct.
 */
function getMovements () {
  return cy.readFile('resources/movements.json')
}

describe('Movements.json tests', () => {
  it('each movement has a name', () => {
    getMovements().then(movements => {
      movements.forEach(movement => {
        assert.isString(movement.name)
        assert.notStrictEqual(movement.name, '')
      })
    })
  })
  it('if movement has requires not empty', () => {
    getMovements().then(movements => {
      movements.forEach(movement => {
        if (movement.requires !== undefined) {
          assert.notStrictEqual(movement.requires, '')
        }
      })
    })
  })
})
