import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../enums/PopupMessage';
import { AbstractPage } from './AbstractPage';
import { BasePage } from './BasePage';

export class AllDashboardsPage extends BasePage {

    readonly addNewDashboardButton: Locator;
    readonly dashboardDeletedMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.addNewDashboardButton = page.locator("(//*[text()='Add New Dashboard']//ancestor::button)[1]");
        this.dashboardDeletedMessage = page.getByText(PopupMessage.DASHBOARD_HAS_BEEN_DELETED);
    }
}