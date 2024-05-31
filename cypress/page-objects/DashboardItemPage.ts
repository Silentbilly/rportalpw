import { BasePage } from "./BasePage";

export class DashboardItemPage extends BasePage {

    get dashboardName() {
        return cy.xpath("//a[text()='All Dashboards']/parent::*/following-sibling::*/span");
    }

    get deleteButton() {
        return cy.xpath("//*[text()='Delete']/ancestor::button");
    }

    get addNewWidgetButton() {
        return cy.xpath("(//button[.//*[contains(text(),'Add new widget')]])[1]");
    }

    getDashboardName(): string {
        return this.dashboardName.invoke('text');
    }

    resizeWidget(widgetName: string): void {
        const widget = `//div[contains(text(), '${widgetName}')]/ancestor::div[contains(@class,'lazyload-wrapper')]`;
        const handleSelector = widget + "/following-sibling::*[contains(@class, 'resizable-handle')]";
        const resizableHandle = cy.xpath(handleSelector).trigger('mousedown', { which: 1 });
        resizableHandle.trigger('mousemove', { clientY: 300 });
        resizableHandle.trigger('mouseup');
    }

    getWidgetHeight(widgetName: string) {
        const widget = `//div[contains(text(), '${widgetName}')]/ancestor::div[contains(@class,'lazyload-wrapper')]`;
        return cy.xpath(widget)
            .invoke('outerHeight');
    }

    scrollToWidget(widgetName: string) {
        const widget = `//div[contains(text(), '${widgetName}')]/ancestor::div[contains(@class,'lazyload-wrapper')]`;
        return cy.xpath(widget)
            .scrollIntoView();
    }
}
