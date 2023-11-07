describe('touch server', () => {
  it('attempts to ping the locally running frontend server', () => {
    cy.visit('localhost:3001/')
  })
})