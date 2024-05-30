import { DashboardItemPage } from "../DashboardItemPage";

export class AddNewWidgetPopup extends DashboardItemPage {

    get nextStepButton() { return cy.xpath("//*[text()='Next step']/parent::button"); }
    get launchStatisticsChartRadioButton() { return cy.xpath("//*[text()='Launch statistics chart']/parent::*[contains(@class,'inputRadio')]"); }
    get demoFilterRadioButton() { return cy.xpath("//*[text()='DEMO_FILTER']/ancestor::label[contains(@class,'inputRadio')]"); }
    get addButton() { return cy.xpath("//button[text()='Add']"); }
    get widgetNameInput() { return cy.xpath("//div[./span[text()='Widget name']]/following-sibling::*//input"); }

    addNewWidget(widgetName: string) : void {
        this.addNewWidgetButton.click();
        this.launchStatisticsChartRadioButton.click();
        this.nextStepButton.click();
        this.demoFilterRadioButton.click();
        this.nextStepButton.click();
        this.widgetNameInput.clear().type(widgetName);
        this.addButton.click();
    }
}