import { Locator, Page } from '@playwright/test'
import logger from '../utils/logger';
import { BasePage } from '../page-objects/BasePage'

export class LoginPage {
    readonly page: Page;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly usernameInput: Locator;
    readonly userAvatar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Login');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByRole('button', { name: 'Login' });
        this.userAvatar = page.getByRole('img', { name: 'avatar' });
    }
    
    async login(username: string, password: string) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
      logger.info(`Logged in as '${username}'`);
    }
}