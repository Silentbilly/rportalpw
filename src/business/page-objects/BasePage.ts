import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../enums/PopupMessage';
import { AbstractPage } from './AbstractPage';

export class BasePage extends AbstractPage {
  readonly userAvatar: Locator;
  readonly successfullLoginMessage: Locator;
  readonly successfullLogoutMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.userAvatar = page.getByRole('img', { name: 'avatar' });
    this.successfullLoginMessage = page.getByText(PopupMessage.SIGNED_IN_SUCCESSFULLY);
    this.successfullLogoutMessage = page.getByText(PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT);
  }
}