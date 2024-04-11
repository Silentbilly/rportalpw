import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";

export class DeleteDashboardPopup extends BasePage {

    readonly DELETE_DASHBOARD_POPUP = "//*[text()='Delete Dashboard']/ancestor::*[contains(@class,'modal-window')]";
    readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deleteButton = page.locator(this.DELETE_DASHBOARD_POPUP + "//button[text()='Delete']");
    }
}