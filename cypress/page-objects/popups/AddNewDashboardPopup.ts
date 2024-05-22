import { Locator, Page } from "playwright";

export class AddNewDashboardPopup {

    private readonly ADD_NEW_DASHBOARD_POPUP = "//*[text()='Add New Dashboard']/ancestor::*[contains(@class,'modal-window')]";
    private readonly nameInput: Locator;
    private readonly descriptionInput: Locator;
    private readonly addButton: Locator;

    constructor(page: Page) {
        this.nameInput = page.getByPlaceholder("Enter dashboard name");
        this.descriptionInput = page.getByPlaceholder("Enter dashboard description");
        this.addButton = page.locator(this.ADD_NEW_DASHBOARD_POPUP + "//button[text()='Add']");
    }

    async addNewDashboard(name: string, description: string) : Promise<void> {
        await this.nameInput.fill(name);
        await this.descriptionInput.fill(description);
        await this.addButton.click();
    }
}