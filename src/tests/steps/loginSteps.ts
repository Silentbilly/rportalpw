import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../hooks/pageFixture";
import config from '../../core/resources/config.json';
import { RP_PASSWORD, RP_USERNAME } from "../../core/resources/envParameters";
import { LoginPage } from "../../business/page-objects/LoginPage";
import { expect } from "@playwright/test";
import { BasePage } from "../../business/page-objects/BasePage";
import { UserDropDownMenu } from "../../business/page-objects/components/UserDropdownMenu";
import { logger } from "../../../playwright.config";

setDefaultTimeout(config.defaultTimout);

let loginPage: LoginPage;
let basePage: BasePage;
let userDropDownMenu: UserDropDownMenu;

Given('User navigates to the application', async () => {
    loginPage = new LoginPage(fixture.page);
    basePage = new BasePage(fixture.page);
    userDropDownMenu = new UserDropDownMenu(fixture.page);
    await fixture.page.goto(config.baseUrl);
});

When('User enters valid username and password and clicks submit button', async () => {
    logger.info('User enters valid username and password and clicks submit button');
    await loginPage.login(RP_USERNAME, RP_PASSWORD);
});

Then('The successfull login message should appear', async () => {
    logger.info('Getting successfull login message');
    await expect(basePage.successfullLoginMessage, 'The successfull login message should be appeared').toBeVisible();
});

When('Clicks on user dropdown menu', async () => {
    await basePage.clickOn(basePage.userAvatar);
    const actualUserName = await userDropDownMenu.getUserName();
    logger.info(`The user name in dropdown user menu - '${actualUserName}'`);
});

Then('User name should be in user dropdown menu', async () => {
    const actualUserName = await userDropDownMenu.getUserName();
    await expect(actualUserName, `User should be loooged in as '${RP_USERNAME}'`).toEqual(RP_USERNAME);
});

When('Clicks on logout option', async () => {
    userDropDownMenu = new UserDropDownMenu(fixture.page);
    await userDropDownMenu.clickOn(userDropDownMenu.logoutOption);
});

Then('The successfull logout message should appear', async () => {
    logger.info('Getting successfull logout message');
    await expect(basePage.successfullLogoutMessage, 'The successfull logout message should be appeared').toBeVisible();
});

When('User enters invalid username {string} and password {string} and clicks submit button', async (userName, password) => {
    await loginPage.login(userName, password);
});

Then(/^The bad credentials login message should (not )?appear for "([^"]*)" and "([^"]*)"$/, async (notArg, userName: string, password: string) => {
    logger.info('Getting bad credentials message');
    if (notArg) {
        await expect(loginPage.badCredentialsLoginMessage, 'The bad credentials message should not appeare').not.toBeVisible();
    } else {
        await expect(loginPage.badCredentialsLoginMessage, 'The bad credentials message should appeare').toBeVisible();
    }
});