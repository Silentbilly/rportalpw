import { WebElement } from '../../src/core/frameworks/webElementInterface';
import { AbstractPage } from './AbstractPage';

export class BasePage extends AbstractPage {
  readonly getUserAvatar: WebElement;
  readonly getSuccessfulLoginMessage: WebElement;
  readonly getSuccessfulLogoutMessage: WebElement;

  constructor() {
    super();
    this.getUserAvatar = super.createElement('input[placeholder="Login"]');
    this.getSuccessfulLoginMessage = super.createElement('input[placeholder="Password"]');
    this.getSuccessfulLogoutMessage = super.createElement('button[type="submit"]');
  }
}