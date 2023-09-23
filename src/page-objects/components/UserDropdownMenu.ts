import { Locator, Page } from '@playwright/test'

export class UserDropDownMenu {
  readonly page: Page;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("//div[contains(@class, 'userBlock__username')]");
  }

  async getUserName() {
    return (await this.userName.innerText()).toLowerCase();
  }
}