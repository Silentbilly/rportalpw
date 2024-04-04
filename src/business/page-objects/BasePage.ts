import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../enums/PopupMessage';

export class BasePage {
  private readonly userAvatar: Locator;
  private readonly successfullLoginMessage: Locator;
  private readonly successfullLogoutMessage: Locator;


  constructor(page: Page) {
    this.userAvatar = page.getByRole('img', { name: 'avatar' });
    this.successfullLoginMessage = page.getByText(PopupMessage.SIGNED_IN_SUCCESSFULLY);
    this.successfullLogoutMessage = page.getByText(PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT);
  }

  async clickOnUserAvatar() : Promise<void> {
    await this.userAvatar.click();
  }

  async isLoginSuccessfullMessageAppeared() : Promise<boolean> {
    return this.successfullLoginMessage.isVisible();
  }

  async isLogoutSuccessfullMessageAppeared() : Promise<boolean> {
    return this.successfullLogoutMessage.isVisible();
  }
}