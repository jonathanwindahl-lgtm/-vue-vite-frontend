import { Given, When, Then,  Before } from '@badeball/cypress-cucumber-preprocessor'

Before(() => {

  cy.clearLocalStorage()
})


Given('Jag är på hemsidan', () => {
  cy.visit('http://localhost:5173/')
})

When('Jag klickar på en produkt', () => {
  cy.contains('Löparskor').click()
})

Then('Tar mig till produktsidan', () => {
cy.url().should('include', '/product/')
})

When('Jag väljer en storlek', () => {
  cy.get('select').select('42')
})

When('Jag klickar på lägg i varukorg knappen', () => {
  cy.get('button').click()
})

Then('Produkten läggs till i varukorgen och varukorgen uppdateras', () => {
cy.get('#cart-count').should('not.have.text', '0')
cy.get('#cart-count').invoke('text').then(parseFloat).should('be.gte', 1)


cy.window().then((win) => {
const cart = JSON.parse(win.localStorage.getItem('cart'))
expect(cart).to.not.be.null
expect(cart.length).to.be.gte(1)
})
})
