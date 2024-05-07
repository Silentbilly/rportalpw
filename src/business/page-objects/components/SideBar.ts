import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";

export class SideBar extends BasePage {

    readonly dashboardsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardsButton = page.locator("//*[contains(text(),'Dashboards')]/ancestor::*[contains(@class,'sidebar-btn')]//a");
    }
}