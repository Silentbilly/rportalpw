import { BasePage } from "../page-objects/BasePage";
import { LoginPage } from "../page-objects/LoginPage";
import config from '../../src/core/resources/config.json';
import { UserDropDownMenu } from "../page-objects/components/UserDropdownMenu";

describe('template spec', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let userDropDownMenu: UserDropDownMenu;

  beforeEach(() => {
    const username = Cypress.env('RP_USERNAME');
    const password = Cypress.env('RP_PASSWORD');
    loginPage = new LoginPage();
    userDropDownMenu = new UserDropDownMenu();
    basePage = new BasePage();

    cy.visit(config.baseUrl);
    loginPage.login(username, password);
  });
  it('Login - positive scenario', () => {
    basePage.getUserAvatar().should('be.visible').and('exist');
  });
});