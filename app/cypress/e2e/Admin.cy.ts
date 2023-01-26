describe('Admin journey', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.intercept('POST', '/v1/api/users').as('createUser')
        cy.intercept('GET', '/v1/api/users').as('getAllUsers')
        cy.intercept('DELETE', '/v1/api/users/*').as('deleteUser')
    })
    it('navigates to the create user form, creates a user, and confirms the user is now listed', () => {
        cy.request('POST', 'http://localhost:8081/v1/api/seed')
        cy.clickButton('Admin')
        cy.clickLink('Create New User')
        cy.get('input[type=text]').type('Cypress User')
        cy.getBySel('submit-user').click()

        cy.wait('@createUser').its('response.statusCode').should('eq', 200)
        cy.clickButton('Back')

        cy.getBySel('view-all-users').click()
        cy.wait('@getAllUsers').its('response.statusCode').should('eq', 200)
        cy.getBySel('user-item').should('exist')
    })

    it('navigates to the user list, deletes all users, and confirms they no longer listed', () => {
        cy.request('POST', 'http://localhost:8081/v1/api/seed/users')
        cy.clickButton('Admin')
        cy.clickLink('View Users')
        cy.getBySel('delete-user').first().click()
        cy.getBySel('delete-user').first().click()

        cy.wait(['@deleteUser', '@getAllUsers'])
        cy.getBySel('user-item').should('not.exist')
    })
})
