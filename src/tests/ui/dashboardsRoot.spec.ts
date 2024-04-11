import { test, expect } from '@playwright/test';
import { AllDashboardsPage } from '../../business/page-objects/AllDashboardsPage';
import { LoginPage } from '../../business/page-objects/LoginPage';
import { RP_PASSWORD, RP_USERNAME } from '../../core/resources/envParameters';
import config from '../../core/resources/config.json';
import { SideBar } from '../../business/page-objects/components/SideBar';
import { StringUtils } from '../../core/utils/StringUtils';
import { DashboardItemPage } from '../../business/page-objects/DashboardItemPage';
import { AddNewDashboardPopup } from '../../business/page-objects/popups/AddNewDashboardPopup';
import { DeleteDashboardPopup } from '../../business/page-objects/popups/DeleteDashboardPopup';

test.describe.configure({ mode: 'serial' });

let loginPage: LoginPage;
let dashboardsPage: AllDashboardsPage;
let sideBar: SideBar;
let addNewDashboardPopup: AddNewDashboardPopup;
let deleteDashboardPopup: DeleteDashboardPopup;
let dashboardItemPage: DashboardItemPage;
let dashboardName: string;
let dashboardDescription: string;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardsPage = new AllDashboardsPage(page);
    sideBar = new SideBar(page);
    addNewDashboardPopup = new AddNewDashboardPopup(page);
    deleteDashboardPopup = new DeleteDashboardPopup(page);
    dashboardItemPage = new DashboardItemPage(page);

    dashboardName = await StringUtils.getRandomName(20);
    dashboardDescription = await StringUtils.getRandomString(12);

    await page.goto(config.baseUrl);
    await loginPage.login(RP_USERNAME, RP_PASSWORD);
    await sideBar.clickOnDashboardsPage();
    await dashboardsPage.clickOnAddNewDashboardButton();
    await addNewDashboardPopup.addNewDashboard(dashboardName, dashboardDescription);
});

test('User is able to create a dashboard via UI', async () => {
    await expect(dashboardItemPage.dashboardName, `Dashboard ${dashboardName} should be created`).toHaveText(dashboardName);
});

test('User is able to remove a dashboard via UI', async () => {
    await dashboardItemPage.clickOnDeleteButton();
    await deleteDashboardPopup.clickOnDeleteButton();

    await expect(dashboardsPage.isDashboardDeletedMessageAppeared, 'Dashboard deleted message is appeared').toBeTruthy();
});