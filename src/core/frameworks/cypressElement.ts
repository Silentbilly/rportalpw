import { WebElement } from "./webElementInterface";

export class CypressElement implements WebElement {
    private selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    click(): Promise<void> {
        return new Promise((resolve) => {
            cy.get(this.selector).click({ force: true }).then(() => {
                resolve();
            });
        });
    }

    type(text: string): Promise<void> {
        return new Promise((resolve) => {
            cy.get(this.selector).type(text).then(() => {
                resolve();
            });
        });
    }

    getText(): Promise<string> {
        return new Promise((resolve) => {
            cy.get(this.selector).invoke('text').then((text) => {
                resolve(text);
            });
        });
    }

    get element() {
        return cy.get(this.selector);
    }
}