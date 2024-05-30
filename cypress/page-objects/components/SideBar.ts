import { BasePage } from "../BasePage";

export class SideBar extends BasePage {

    get dashboardsButton() { return cy.xpath("//*[contains(text(),'Dashboards')]/ancestor::*[contains(@class,'sidebar-btn')]//a"); }
}