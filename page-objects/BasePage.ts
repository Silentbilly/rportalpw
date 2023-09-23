import { Locator, Page } from '@playwright/test'
import { UserDropDownMenu } from './components/UserDropdownMenu'
import logger from '../utils/logger';


export class BasePage {
    readonly page: Page;
    readonly userAvatar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userAvatar = page.getByRole('img', { name: 'avatar' });
    }

    async clickOnUserAvatar() {
        await this.userAvatar.click();
    }
}