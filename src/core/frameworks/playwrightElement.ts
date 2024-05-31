import { Locator } from 'playwright';
import { WebElement } from "./webElementInterface";

export class PlaywrightElement implements WebElement {
  private locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async type(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async getText(): Promise<string> {
    return await this.locator.textContent() || '';
  }
}