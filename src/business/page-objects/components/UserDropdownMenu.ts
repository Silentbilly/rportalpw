import { Locator, Page } from '@playwright/test';

export class UserDropDownMenu {
  private readonly userNameInput: Locator;
  private readonly logoutOption: Locator;

  constructor(page: Page) {
    this.userNameInput = page.locator("//div[contains(@class, 'userBlock__username')]");
    this.logoutOption = page.locator("//*[contains(@class, 'userBlock__menu-item') and normalize-space()='Logout']");
  }

  async getUserName() : Promise<string> {
    return (await this.userNameInput.innerText()).toLowerCase();
  }

  async clickOnLogout() : Promise<void> {
    await this.logoutOption.click();
  }
}