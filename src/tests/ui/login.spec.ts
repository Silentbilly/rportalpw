import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { BasePage } from '../../page-objects/BasePage';
import { UserDropDownMenu } from '../../page-objects/components/UserDropdownMenu'
import config from '../../resources/config.json';
import logger from '../../utils/logger';
import { RP_USERNAME, RP_PASSWORD } from '../../utils/config';

test.describe.parallel('Login and logout flow @login', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let userDropDownMenu: UserDropDownMenu;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
  })

  test('Login and logout - positive scenario', async ({ page }) => {
    basePage = new BasePage(page);
    userDropDownMenu = new UserDropDownMenu(page);

    await loginPage.login(RP_USERNAME, RP_PASSWORD);
    await basePage.clickOnUserAvatar();
    const userName = await userDropDownMenu.getUserName();
    logger.info(`The user name in dropdown user menu - '${userName}'`);

    await expect(userName).toEqual(config.userName);
  })
})