import { Locator, Page } from "playwright";
import { AllDashboardsPage } from "../AllDashboardsPage";


export class SideBar {

    private readonly dashboardsButton: Locator;

    constructor(page: Page) {
        this.dashboardsButton = page.locator("//*[contains(text(),'Dashboards')]/ancestor::*[contains(@class,'sidebar-btn')]//a");
    }

    async clickOnDashboardsPage(): Promise<void> {
        await this.dashboardsButton.click();
    }
}
