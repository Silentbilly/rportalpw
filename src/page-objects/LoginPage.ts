import { Locator, Page } from '@playwright/test';
import logger from '../utils/logger';

export class LoginPage {
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly usernameInput: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByPlaceholder('Login');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }
    
  async login(username: string, password: string) : Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    logger.info(`Logged in as '${username}'`);
  }
}