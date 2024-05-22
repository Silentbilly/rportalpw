import { PopupMessage } from "../../src/business/enums/PopupMessage";

export class LoginPage {
  readonly usernameInput: string;
  readonly passwordInput: string;
  readonly submitButton: string;
  readonly badCredentialsLoginMessage: string;

  constructor() {
    this.usernameInput = 'input[placeholder="Login"]';
    this.passwordInput = 'input[placeholder="Password"]';
    this.submitButton = 'button[type="submit"]';
    this.badCredentialsLoginMessage = PopupMessage.BAD_CREDENTIALS; // Assuming PopupMessage is defined elsewhere
  }

  login(username: string, password: string): void {
    cy.get(this.usernameInput).type(username);
    cy.get(this.passwordInput).type(password);
    cy.get(this.submitButton).click();
    Cypress.log({
      name: 'login',
      message: `Logging in as '${username}'`,
    });
  }
}