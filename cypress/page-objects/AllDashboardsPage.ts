import { BasePage } from './BasePage';

export class AllDashboardsPage extends BasePage {

    get addNewDashboardButton() { return cy.xpath("(//*[text()='Add New Dashboard']//ancestor::button)[1]"); }

    clickOnDashboardItem(itemName: string) {
        cy.xpath(`//*[contains(@class,'grid')]/div//a[text()='${itemName}']`).click();
    }
}