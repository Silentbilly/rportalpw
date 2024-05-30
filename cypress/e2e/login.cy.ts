import { BasePage } from "../page-objects/BasePage";
import { LoginPage } from "../page-objects/LoginPage";
import { UserDropDownMenu } from "../page-objects/components/UserDropdownMenu";
import { RP_USERNAME, RP_PASSWORD } from '../support/envParameters';

describe('Login tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let userDropDownMenu: UserDropDownMenu;

  beforeEach(() => {

    loginPage = new LoginPage();
    userDropDownMenu = new UserDropDownMenu();
    basePage = new BasePage();

    cy.visit(Cypress.config().baseUrl);
    loginPage.login(RP_USERNAME, RP_PASSWORD);
  });

  it('Login - positive scenario', () => {
    basePage.getUserAvatar.should('be.visible').and('exist');
  });
  it('Login - user is logged in', () => {
    basePage.getUserAvatar.click({force:true});

    userDropDownMenu.userNameInput.should('have.text', RP_USERNAME);
  });

  it('Logout', () => {
    basePage.getUserAvatar.click({force:true});
    userDropDownMenu.logoutOption.click();

    basePage.getSuccessfulLogoutMessage.should('be.visible');
  });
});