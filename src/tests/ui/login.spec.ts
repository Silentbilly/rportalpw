import { test, expect } from '@playwright/test';
import { LoginPage } from '../../business/page-objects/LoginPage';
import { BasePage } from '../../business/page-objects/BasePage';
import { UserDropDownMenu } from '../../business/page-objects/components/UserDropdownMenu';
import config from '../../core/resources/config.json';
import { RP_USERNAME, RP_PASSWORD } from '../../core/resources/envParameters';
import { logger } from '../../../playwright.config';

test.describe.configure({ mode: 'serial' });

let basePage: BasePage;
let loginPage: LoginPage;
let userDropDownMenu: UserDropDownMenu;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  userDropDownMenu = new UserDropDownMenu(page);
  basePage = new BasePage(page);

  await page.goto(config.baseUrl);
  await loginPage.login(RP_USERNAME, RP_PASSWORD);
});

test('Login - positive scenario', async () => {
  await expect(basePage.successfullLoginMessage, 'The successfull login message should be appeared').toBeVisible();
});

test('Login - user is logged in', async () => {
  await basePage.clickOn(basePage.userAvatar);
  const actualUserName = await userDropDownMenu.getUserName();
  logger.info(`The user name in dropdown user menu - '${actualUserName}'`);

  await expect(actualUserName, `User should be loooged in as '${RP_USERNAME}'`).toEqual(RP_USERNAME);
});

test('Logout', async () => {
  await basePage.clickOn(basePage.userAvatar);
  await userDropDownMenu.clickOn(userDropDownMenu.logoutOption);

  await expect(basePage.successfullLogoutMessage, 'The successfull logout message should be appeared').toBeVisible();
});