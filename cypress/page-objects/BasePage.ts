  import { PopupMessage } from '../../src/business/enums/PopupMessage';
  import { AbstractPage } from './AbstractPage';

  export class BasePage extends AbstractPage {
    readonly userAvatar: string;
    readonly successfulLoginMessage: string;
    readonly successfulLogoutMessage: string;

    constructor() {
      super();
      this.userAvatar = "(//*[@alt='avatar'])[1]";
      this.successfulLoginMessage = `//*[contains(text(),'${PopupMessage.SIGNED_IN_SUCCESSFULLY}')]`;
      this.successfulLogoutMessage = `//*[contains(text(),'${PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT}')]`;
    }

    getUserAvatar() {
      return cy.xpath(this.userAvatar);
    }

    getSuccessfulLoginMessage() {
      return cy.xpath(this.successfulLoginMessage);
    }

    getSuccessfulLogoutMessage() {
      return cy.xpath(this.successfulLogoutMessage);
    }
  }