import { BasePage } from "../page-objects/BasePage";
import { LoginPage } from "../page-objects/LoginPage";
import config from '../../src/core/resources/config.json';
import { UserDropDownMenu } from "../page-objects/components/UserDropdownMenu";
import { StringUtils } from "../../src/core/utils/StringUtils";

describe('template spec', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let userDropDownMenu: UserDropDownMenu;
  let authToken: string;

  beforeEach(() => {
    const username = Cypress.env('RP_USERNAME');
    const password = Cypress.env('RP_PASSWORD');
    const basicAuthToken = Cypress.env('BASIC_AUTH_TOKEN');
    const filterName = StringUtils.getRandomString(6);

    cy.request({
      method: 'POST',
      url: '/uat/sso/oauth/token',
      body: `grant_type=password&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${basicAuthToken}`
      },
      form: true
    }).then((response) => {
      authToken = response.body.access_token;
      cy.log('Auth Token:', authToken);

      cy.request({
        method: 'POST',
        url: '/api/v1/rp_dashboards/widget/preview',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: {
          "widgetType":"statisticTrend",
          "contentParameters":{
            "contentFields":[
              "statistics$executions$total",
              "statistics$executions$passed",
              "statistics$executions$failed",
              "statistics$executions$skipped",
              "statistics$defects$product_bug$pb001",
              "statistics$defects$automation_bug$ab001",
              "statistics$defects$system_issue$si001",
              "statistics$defects$no_defect$nd001",
              "statistics$defects$to_investigate$ti001"
            ],
            "itemsCount":"50",
            "widgetOptions":{
              "zoom":false,
              "timeline":"launch",
              "viewMode":"area-spline"
            }
          },
          "filters":[{"value":"16","name":"DEMO_FILTER"}],
          "filterIds":["16"]
        },
      }).then((response) => {
      cy.log('Auth Token:', authToken);

      cy.request({
        method: 'POST',
        url: '/api/v1/rp_dashboards/widget/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: {
          "widgetType": "statisticTrend",
          "contentParameters": {
            "contentFields": [
              "statistics$executions$total",
              "statistics$executions$passed",
              "statistics$executions$failed",
              "statistics$executions$skipped",
              "statistics$defects$product_bug$pb001",
              "statistics$defects$automation_bug$ab001",
              "statistics$defects$system_issue$si001",
              "statistics$defects$no_defect$nd001",
              "statistics$defects$to_investigate$ti001"
            ],
            "itemsCount": "50",
            "widgetOptions": {
              "zoom": false,
              "timeline": "launch",
              "viewMode": "area-spline"
            }
          },
          "filters": [
            {
              "value": "16",
              "name": "DEMO_FILTER"
            }
          ],
          "name": filterName,
          "description": "",
          "filterIds": ["16"]
        },
      }).then((widgetResponse) => {
          loginPage = new LoginPage();
          userDropDownMenu = new UserDropDownMenu();
          basePage = new BasePage();

          cy.visit(config.baseUrl);
          loginPage.login(username, password);
        });
      });
    });
  });

  it('Widget - positive scenario', () => {
    basePage.getUserAvatar().should('be.visible').and('exist');
  });
});