describe('User journey', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.request('POST', 'http://localhost:8081/v1/api/seed/users')
        cy.intercept('GET', '/v1/api/users').as('getAllUsers')
        cy.intercept('POST', '/v1/api/users/*/answers').as('submitAnswers')
    })

    it('selects a user and answers a questionnaire with no extra information', () => {
        cy.clickButton('App')
        cy.wait('@getAllUsers')

        cy.getBySel('user-dropdown').select('Jane Doe')
        cy.getBySel('submit-button').click()

        cy.clickLink('Start new questionnaire')

        cy.getBySel('form-text').find('input').type('Cypress short task name')
        cy.getBySel('submit-button').click()

        cy.get('[type="radio"]').last().check()
        cy.getBySel('submit-button').click()

        cy.wait('@submitAnswers').its('response.statusCode').should('eq', 200)
    })

    it('selects a user and answers a questionnaire with extra information', () => {
        cy.clickButton('App')
        cy.wait('@getAllUsers')

        cy.getBySel('user-dropdown').select('Jane Doe ')
        cy.getBySel('submit-button').click()

        cy.clickLink('Start new questionnaire')

        cy.getBySel('form-text').find('input').type('Cypress long task name')
        cy.getBySel('submit-button').click()

        cy.get('[type="radio"]').first().check()
        cy.getBySel('submit-button').click()

        cy.getBySel('form-text-area').type('Cypress long task description')
        cy.getBySel('submit-button').click()

        cy.wait('@submitAnswers').its('response.statusCode').should('eq', 200)
    })
})
