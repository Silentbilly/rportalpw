export class AddNewDashboardPopup {

    readonly ADD_NEW_DASHBOARD_POPUP = "//*[text()='Add New Dashboard']/ancestor::*[contains(@class,'modal-window')]";
    get nameInput() { return cy.xpath("//input[@placeholder='Enter dashboard name']"); }
    get descriptionInput() { return cy.xpath("//textarea[@placeholder='Enter dashboard description']"); }
    get addButton() { return cy.xpath(`${this.ADD_NEW_DASHBOARD_POPUP}//button[text()='Add']`); }

    addNewDashboard(name: string, description: string) : void {
        this.nameInput.type(name);
        this.descriptionInput.type(description);
        this.addButton.click();
    }
}