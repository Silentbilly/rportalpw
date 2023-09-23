import { Locator, Page } from '@playwright/test';

export class BasePage {
  private readonly userAvatar: Locator;

  constructor(page: Page) {
    this.userAvatar = page.getByRole('img', { name: 'avatar' });
  }

  async clickOnUserAvatar() {
    await this.userAvatar.click();
  }
}