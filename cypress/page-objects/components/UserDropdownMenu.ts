import { BasePage } from '../BasePage';

export class UserDropDownMenu extends BasePage {
  readonly userNameInput: string;
  readonly logoutOption: string;

  constructor() {
    super();
    this.userNameInput = "//div[contains(@class, 'userBlock__username')]";
    this.logoutOption = "//*[contains(@class, 'userBlock__menu-item') and normalize-space()='Logout']";
  }

  getUserName(): Cypress.Chainable<string> {
    return cy.get(this.userNameInput).invoke('text').then(text => text.toLowerCase());
  }
}