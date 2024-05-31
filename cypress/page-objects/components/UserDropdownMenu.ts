import { BasePage } from '../BasePage';

export class UserDropDownMenu {

  get userNameInput() { return cy.xpath("//div[contains(@class, 'userBlock__username')]"); }
  get logoutOption() { return cy.xpath("//*[contains(@class, 'userBlock__menu-item') and normalize-space()='Logout']"); }
}