import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class UserDropDownMenu extends BasePage {
  readonly userNameInput: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("//div[contains(@class, 'userBlock__username')]");
    this.logoutOption = page.locator("//*[contains(@class, 'userBlock__menu-item') and normalize-space()='Logout']");
  }

  async getUserName() : Promise<string> {
    return (await this.userNameInput.innerText()).toLowerCase();
  }
}