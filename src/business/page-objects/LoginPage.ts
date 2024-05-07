import { Locator, Page } from '@playwright/test';
import { logger } from '../../../playwright.config';
import { PopupMessage } from '../enums/PopupMessage';

export class LoginPage {
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly usernameInput: Locator;
  readonly badCredentialsLoginMessage: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByPlaceholder('Login');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.badCredentialsLoginMessage = page.getByText(PopupMessage.BAD_CREDENTIALS);
  }

  async login(username: string, password: string) : Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    logger.info(`Logging in as '${username}'`);
  }
}