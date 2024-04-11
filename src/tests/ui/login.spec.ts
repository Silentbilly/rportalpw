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
let isSuccessfullMessageAppeared: Promise<boolean>;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  userDropDownMenu = new UserDropDownMenu(page);

  await page.goto(config.baseUrl);
  await loginPage.login(RP_USERNAME, RP_PASSWORD);
});

test('Login - positive scenario', async ({ page }) => {
  basePage = new BasePage(page);

  isSuccessfullMessageAppeared = basePage.isVisible(basePage.successfullLoginMessage);
  await basePage.clickOn(basePage.userAvatar);
  const actualUserName = await userDropDownMenu.getUserName();
  logger.info(`The user name in dropdown user menu - '${actualUserName}'`);

  await expect(isSuccessfullMessageAppeared, 'The successfull login message should be appeared').toBeTruthy();
  await expect(actualUserName, `User should be loooged in as '${RP_USERNAME}'`)
    .toEqual(RP_USERNAME);
});

test('Logout', async ({ page }) => {
  basePage = new BasePage(page);

  await basePage.clickOn(basePage.userAvatar);
  await userDropDownMenu.clickOnLogout();

  await expect(basePage.isVisible(basePage.successfullLogoutMessage), 'The successfull logout message should be appeared').toBeTruthy();
});