describe('touch server', () => {
  it('attempts to ping the locally running frontend server', () => {
    cy.visit('localhost:3001/') // Change this to deployed environment later if we ever want to do e2e testing.
    // will need to change the test script slightly to do so also.
  })
})