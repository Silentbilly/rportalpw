export class AbstractPage {

    clickOn(selector: any) {
        Cypress.log({
            name: 'clickOn',
            message: `Clicking on ${selector}`,
        });

        cy.get(selector).click();
    }
}