  import { PopupMessage } from '../../src/business/enums/PopupMessage';
  import { AbstractPage } from './AbstractPage';

  export class BasePage extends AbstractPage {
    readonly userAvatar: string;
    readonly successfulLoginMessage: string;
    readonly successfulLogoutMessage: string;

    constructor() {
      super();
      this.userAvatar = '[alt="avatar"]';
      this.successfulLoginMessage = 'text=PopupMessage.SIGNED_IN_SUCCESSFULLY';
      this.successfulLogoutMessage = 'text=PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT';
    }

    getUserAvatar() {
      return cy.get(this.userAvatar);
    }

    getSuccessfulLoginMessage() {
      return cy.contains(PopupMessage.SIGNED_IN_SUCCESSFULLY);
    }

    getSuccessfulLogoutMessage() {
      return cy.contains(PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT);
    }
  }