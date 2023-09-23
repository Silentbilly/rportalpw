import { Locator, Page } from '@playwright/test';

export class UserDropDownMenu {
  private readonly page: Page;
  private readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("//div[contains(@class, 'userBlock__username')]");
  }

  async getUserName() {
    return (await this.userName.innerText()).toLowerCase();
  }
}