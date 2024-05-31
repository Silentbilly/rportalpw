import { PopupMessage } from "../../src/business/enums/PopupMessage";
import { Framework } from "../../src/core/frameworks/webElementFactory";
import { WebElement } from "../../src/core/frameworks/webElementInterface";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput: WebElement;
  readonly passwordInput: WebElement;
  readonly submitButton: WebElement;
  readonly badCredentialsLoginMessage: string;

  constructor() {
    super();
    this.usernameInput = super.createElement('input[placeholder="Login"]');
    this.passwordInput = super.createElement('input[placeholder="Password"]');
    this.submitButton = super.createElement('button[type="submit"]');
    this.badCredentialsLoginMessage = PopupMessage.BAD_CREDENTIALS;
  }

  login(username: string, password: string): void {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
    Cypress.log({
      name: 'login',
      message: `Logging in as '${username}'`,
    });
  }
}