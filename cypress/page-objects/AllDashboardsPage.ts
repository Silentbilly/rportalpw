import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../../src/business/enums/PopupMessage';
import { BasePage } from './BasePage';

export class AllDashboardsPage extends BasePage {

    readonly addNewDashboardButton: Locator;
    readonly dashboardDeletedMessage: Locator;

    constructor() {
        super();
        this.addNewDashboardButton = page.locator("(//*[text()='Add New Dashboard']//ancestor::button)[1]");
        this.dashboardDeletedMessage = page.getByText(PopupMessage.DASHBOARD_HAS_BEEN_DELETED);
    }
}