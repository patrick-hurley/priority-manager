Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
})

Cypress.Commands.add('clickButton', (label) => {
    cy.get('button').contains(label).click()
})
