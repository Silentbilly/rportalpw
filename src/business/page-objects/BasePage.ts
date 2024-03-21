import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../enums/PopupMessage';

export class BasePage {
  private readonly USER_AVATAR: Locator;
  private readonly SUCCESSFULL_LOGIN_MESSAGE: Locator;
  private readonly SUCCESSFULL_LOGOUT_MESSAGE: Locator;


  constructor(page: Page) {
    this.USER_AVATAR = page.getByRole('img', { name: 'avatar' });
    this.SUCCESSFULL_LOGIN_MESSAGE = page.getByText(PopupMessage.SIGNED_IN_SUCCESSFULLY);
    this.SUCCESSFULL_LOGOUT_MESSAGE = page.getByText(PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT);
  }

  async clickOnUserAvatar() : Promise<void> {
    await this.USER_AVATAR.click();
  }

  async isLoginSuccessfullMessageAppeared() : Promise<boolean> {
    return this.SUCCESSFULL_LOGIN_MESSAGE.isVisible();
  }

  async isLogoutSuccessfullMessageAppeared() : Promise<boolean> {
    return this.SUCCESSFULL_LOGOUT_MESSAGE.isVisible();
  }
}