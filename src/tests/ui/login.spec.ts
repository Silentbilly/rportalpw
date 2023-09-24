import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { BasePage } from '../../page-objects/BasePage';
import { UserDropDownMenu } from '../../page-objects/components/UserDropdownMenu';
import config from '../../resources/config.json';
import logger from '../../utils/logger';
import { RP_USERNAME, RP_PASSWORD } from '../../utils/envParameters';

test.describe.parallel('Login and logout', () => {
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
    
    isSuccessfullMessageAppeared = basePage.isLoginSuccessfullMessageAppeared();
    await basePage.clickOnUserAvatar();
    const actualUserName = await userDropDownMenu.getUserName();
    logger.info(`The user name in dropdown user menu - '${actualUserName}'`);

    await expect(isSuccessfullMessageAppeared, 'The successfull login message should be appeared').toBeTruthy();
    await expect(actualUserName, `User should be loooged in as '${RP_USERNAME}'`)
      .toEqual(RP_USERNAME);
  });

  test('Logout', async({page}) => {
    basePage = new BasePage(page);

    await basePage.clickOnUserAvatar();
    await userDropDownMenu.clickOnLogout();

    await expect(basePage.isLogoutSuccessfullMessageAppeared, 'The successfull logout message should be appeared').toBeTruthy();
  }
  );
});