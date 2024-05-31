import { LoginPage } from "../page-objects/LoginPage";
import { AllDashboardsPage } from "../page-objects/AllDashboardsPage";
import { DashboardItemPage } from "../page-objects/DashboardItemPage";
import { AddNewDashboardPopup } from "../page-objects/popups/AddNewDashboardPopup";
import { AddNewWidgetPopup } from "../page-objects/popups/AddNewWidgetPopup";
import { SideBar } from "../page-objects/components/SideBar";
import { RP_PASSWORD, RP_USERNAME } from "../support/envParameters";
import { StringUtils } from '../../src/core/utils/StringUtils';


describe('Dashboard widgets tests', () => {
  let loginPage: LoginPage;
  let dashboardsPage: AllDashboardsPage;
  let sideBar: SideBar;
  let addNewDashboardPopup: AddNewDashboardPopup;
  let addNewWidgetPopup: AddNewWidgetPopup;
  let dashboardItemPage: DashboardItemPage;
  let dashboardName: string;
  let dashboardDescription: string;

  dashboardName = StringUtils.getRandomName(20);
  dashboardDescription = StringUtils.getRandomString(12);

  beforeEach(() => {
    loginPage = new LoginPage();
    dashboardsPage = new AllDashboardsPage();
    sideBar = new SideBar();
    addNewDashboardPopup = new AddNewDashboardPopup();
    addNewWidgetPopup = new AddNewWidgetPopup();
    dashboardItemPage = new DashboardItemPage();

    dashboardName = StringUtils.getRandomName(20);
    dashboardDescription = StringUtils.getRandomString(12);

    cy.visit(Cypress.config().baseUrl);
    loginPage.login(RP_USERNAME, RP_PASSWORD);
    sideBar.dashboardsButton.click();
    dashboardsPage.addNewDashboardButton.click();
    addNewDashboardPopup.addNewDashboard(dashboardName, dashboardDescription);
  });


  it('User is able to create a dashboard via UI', () => {
    dashboardItemPage.dashboardName.should('have.text', dashboardName);
  });

  it('User is able to resize widget to minimal height', () => {
    const name = StringUtils.getRandomName(20);
    const expectedMinHeight = 282;
    sideBar.dashboardsButton.click();
    dashboardsPage.clickOnDashboardItem(dashboardName);
    addNewWidgetPopup.addNewWidget(name);
    addNewWidgetPopup.addNewWidget(StringUtils.getRandomName(20));
    dashboardItemPage.resizeWidget(name);

    dashboardItemPage.getWidgetHeight(name).should('be.equal', expectedMinHeight);
  });

  it('User is able to scroll to widget if there are many widgets on the page', () => {
    const name = StringUtils.getRandomName(20);
    sideBar.dashboardsButton.click();
    dashboardsPage.clickOnDashboardItem(dashboardName);
    addNewWidgetPopup.addNewWidget(name);
    addNewWidgetPopup.addNewWidget(StringUtils.getRandomName(20));
    addNewWidgetPopup.addNewWidget(StringUtils.getRandomName(20));

    dashboardItemPage.scrollToWidget(name).should('be.visible');
  });
});