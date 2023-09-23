import { Locator, Page } from '@playwright/test';

export class UserDropDownMenu {
  private readonly userName: Locator;

  constructor(page: Page) {
    this.userName = page.locator("//div[contains(@class, 'userBlock__username')]");
  }

  async getUserName() {
    return (await this.userName.innerText()).toLowerCase();
  }
}