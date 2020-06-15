const WOD_FILE = 'resources/wod-gen.json'

describe('equipment.test.js', () => {
  describe('"equipment"', () => {
    it('should have "equipment" array', () => {
      cy.readFile(WOD_FILE).then(data => {
        assert.isArray(data.equipment)
      })
    })
  })

  describe('"exercises"', () => {
    it('should have "exercises" array', () => {
      cy.readFile(WOD_FILE).then(data => {
        assert.isArray(data.exercises)
      })
    })

    it('verify exercise features', () => {
      cy.readFile(WOD_FILE).then(data => {
        data.exercises.forEach(exercise => {
          assert.exists(exercise.name)
          if (exercise.requires) {
            assert.isString(exercise.requires)
          }
        })
      })
    })
  })
})
