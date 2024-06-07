import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import config from '../../core/resources/config.json';
import { fixture } from "../hooks/pageFixture";
import { AllDashboardsPage } from "../../business/page-objects/AllDashboardsPage";
import { AddNewDashboardPopup } from "../../business/page-objects/popups/AddNewDashboardPopup";
import { StringUtils } from "../../core/utils/StringUtils";
import { logger } from "../../../playwright.config";
import { expect } from "@playwright/test";
import { DashboardItemPage } from "../../business/page-objects/DashboardItemPage";
import { DeleteDashboardPopup } from "../../business/page-objects/popups/DeleteDashboardPopup";

setDefaultTimeout(config.defaultTimout);

let dashboardsPage: AllDashboardsPage;
let dashboardItemPage: DashboardItemPage;
let addNewDashboardPopup: AddNewDashboardPopup;
let deleteDashboardPopup: DeleteDashboardPopup;
let dashboardName: string;
let dashboardDescription: string;

Given("User clicks on 'Add New Dashboard' button", async () => {
    dashboardsPage = new AllDashboardsPage(fixture.page);
    addNewDashboardPopup = new AddNewDashboardPopup(fixture.page);
    dashboardItemPage = new DashboardItemPage(fixture.page);
    deleteDashboardPopup = new DeleteDashboardPopup(fixture.page);

    dashboardName = await StringUtils.getRandomName(20);
    dashboardDescription = await StringUtils.getRandomString(12);

    await dashboardsPage.clickOn(dashboardsPage.addNewDashboardButton);
});

Given("In popup user enters dashboard's name and description and clicks 'Add' button", async function() {
    logger.info('Adding new dashboard');
    await addNewDashboardPopup.addNewDashboard(dashboardName, dashboardDescription);
});

Then('Dashboard is created', async () => {
    logger.info('Getting name of created dashboard');
    await expect(dashboardItemPage.dashboardName, `Dashboard ${dashboardName} should be created`).toHaveText(dashboardName);
});

When('User clicks on Delete button', async () => {
    await dashboardItemPage.clickOn(dashboardItemPage.deleteButton);
});

When('User clicks on Delete button in popup', async function() {
    await deleteDashboardPopup.clickOn(deleteDashboardPopup.deleteButton);
});

Then('Dashboard deleted message is appeared', async function() {
    logger.info('Dashboard deleted message is appeared');
    await expect(dashboardsPage.dashboardDeletedMessage, 'Dashboard deleted message is appeared').toBeVisible();
});