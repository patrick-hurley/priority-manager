import './commands'

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            getBySel(
                selector: string,
                ...options: any
            ): Chainable<JQuery<HTMLElement>>
            clickLink(label: string): Chainable<Element>
            clickButton(label: string): Chainable<Element>
        }
    }
}
