import { CypressElement } from './cypressElement';
import { PlaywrightElement } from './playwrightElement';
import { Page } from 'playwright';
import { WebElement } from './webElementInterface';

export enum Framework {
    Playwright,
    Cypress
}

export class WebElementFactory {
    static createElement(selector: string, framework: Framework, page?: Page): WebElement {
        switch (framework) {
            case Framework.Playwright:
                if (!page) {
                    throw new Error('Playwright page instance is required');
                }
                return new PlaywrightElement(page.locator(selector));
            case Framework.Cypress:
                return new CypressElement(selector);
            default:
                throw new Error('Unsupported framework');
        }
    }
}