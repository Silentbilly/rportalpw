import { Locator, Page } from "playwright";

export class DeleteDashboardPopup {

    private readonly DELETE_DASHBOARD_POPUP = "//*[text()='Delete Dashboard']/ancestor::*[contains(@class,'modal-window')]";
    private readonly deleteButton: Locator;

    constructor(page: Page) {
        this.deleteButton = page.locator(this.DELETE_DASHBOARD_POPUP + "//button[text()='Delete']");
    }

    async clickOnDeleteButton() : Promise<void> {
        await this.deleteButton.click();
    }
}