/**
 * Name: Mason Guiste
 * Date: 6/20/20
 *
 * The test file for verifying movements.json is correct.
 */
function movementTest (test) {
  cy.readFile('resources/movements.json').then(movements => {
    movements.forEach(movement => {
      test(movement)
    })
  })
}

function unitTest (test) {
  movementTest(movement => {
    movement.units.forEach(unit => {
      test(unit)
    })
  })
}

function isNonEmptyString (str) {
  return typeof str === 'string' && str !== ''
}

describe('Movements.json tests', () => {
  it('each movement has a name', () => {
    movementTest(movement => {
      assert.isTrue(isNonEmptyString(movement.name))
    })
  })
  it('if movement has requires not empty', () => {
    movementTest(movement => {
      if (movement.requires !== undefined) {
        assert.notStrictEqual(movement.requires, '')
      }
    })
  })
  describe('units tests', () => {
    it('each has a units', () => {
      movementTest(movement => {
        assert.isArray(movement.units, movement.name + ' missing units array')
      })
    })
    it('each unit has a name', () => {
      unitTest(unit => {
        assert.isTrue(isNonEmptyString(unit.name))
      })
    })
    it('has rep_time number or rep_times object', () => {
      unitTest(unit => {
        if (unit.rep_time) {
          assert.isNumber(unit.rep_time)
        } else if (unit.rep_times) {
          assert.isObject(unit.rep_times)
        } else {
          assert.isTrue(false, 'each unit must have either "rep_time" or "rep_times"')
        }
      })
    })
    it('if has rep_times both the rep and time are numbers above 0', () => {
      unitTest(unit => {
        if (unit.rep_times) {
          Object.keys(unit.rep_times).forEach(reps => {
            assert.isAbove(parseInt(reps), 0)
            assert.isAbove(unit.rep_times[reps], 0)
          })
        }
      })
    })
  })
})
