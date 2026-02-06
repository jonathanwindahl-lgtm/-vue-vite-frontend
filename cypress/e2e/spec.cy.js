describe("Product page", function () {
  beforeEach (() => {
    cy.visit('http://localhost:5173/')
  })
  it("visits my site", function () {
    cy.get(".product-card")
    .should('exist')
    .and('have.length.greaterThan', 0)

  })
  it('filtrerar produkter baserat på sökning', () => {
    cy.get('.product-card').then(cards => {
      const initialCount = cards.length

      cy.get('input').type('svart')

      cy.get('.product-card')
      .should('have.length.lessThan', initialCount)
    })

  })

})


describe('Skapa konto', () => {
beforeEach(() => {
cy.visit('http://localhost:5173/')
cy.window().then(win => win.localStorage.clear())
cy.contains('Logga in').click()
cy.contains('Skapa konto').click()
})

it('skapar konto och sparar användare i localStorage', () => {
  cy.get('input[type="email"]').type('test@test.se')
  cy.get('input[type="password"]').type('password1')

  cy.get('button').contains('Skapa konto').click()
  cy.contains('Konto skapat').should('exist')

  cy.window().then(win => {

    const user = JSON.parse(win.localStorage.getItem('user'))
    expect(user.email).to.equal('test@test.se')
    expect(user.password).to.equal('password1')
  })

})



})
