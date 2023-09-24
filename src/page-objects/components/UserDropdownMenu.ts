import { Locator, Page } from '@playwright/test';

export class UserDropDownMenu {
  private readonly USER_NAME_INPUT: Locator;
  private readonly LOGOUT_OPTION: Locator;

  constructor(page: Page) {
    this.USER_NAME_INPUT = page.locator("//div[contains(@class, 'userBlock__username')]");
    this.LOGOUT_OPTION = page.locator("//*[contains(@class, 'userBlock__menu-item') and normalize-space()='Logout']");
  }

  async getUserName() : Promise<string> {
    return (await this.USER_NAME_INPUT.innerText()).toLowerCase();
  }

  async clickOnLogout() : Promise<void> {
    await this.LOGOUT_OPTION.click();
  }
}