import { BasePage } from "../page-objects/BasePage";
import { LoginPage } from "../page-objects/LoginPage";
import { UserDropDownMenu } from "../page-objects/components/UserDropdownMenu";

describe('template spec', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let userDropDownMenu: UserDropDownMenu;

  beforeEach(() => {
    const username = 'default';
    const password = '1q2w3e';
    loginPage = new LoginPage();
    userDropDownMenu = new UserDropDownMenu();
    basePage = new BasePage();

    cy.visit('http://localhost:8080');
    loginPage.login(username, password);
  });

  it('Login - positive scenario', () => {
    basePage.getUserAvatar().should('be.visible').and('exist');
  });
  it('Login - user is logged in', () => {
    basePage.clickOn(basePage.userAvatar);
    const actualUserName = userDropDownMenu.getUserName();

    actualUserName.should('equal', Cypress.env('rp_username'));
  });

  it('Logout', async () => {
    basePage.clickOn(basePage.userAvatar);
    userDropDownMenu.clickOn(userDropDownMenu.logoutOption);

    basePage.getSuccessfulLogoutMessage().should('be.visible');
  });
});