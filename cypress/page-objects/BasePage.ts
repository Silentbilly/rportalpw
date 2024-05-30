  import { PopupMessage } from '../../src/business/enums/PopupMessage';
  import { AbstractPage } from './AbstractPage';

  export class BasePage {

    get getUserAvatar() {
      return cy.xpath("(//*[@alt='avatar'])[1]");
    }

    get getSuccessfulLoginMessage() {
      return cy.xpath(`//*[contains(text(),'${PopupMessage.SIGNED_IN_SUCCESSFULLY}')]`);
    }

    get getSuccessfulLogoutMessage() {
      return cy.xpath(`//*[contains(text(),'${PopupMessage.YOU_HAVE_BEEN_LOGGED_OUT}')]`);
    }
  }