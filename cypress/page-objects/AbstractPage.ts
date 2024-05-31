import { Framework, WebElementFactory } from '../../src/core/frameworks/webElementFactory';
import { WebElement } from '../../src/core/frameworks/webElementInterface';

export abstract class AbstractPage {

  protected createElement(selector: string): WebElement {
    return WebElementFactory.createElement(selector, Framework.Cypress);
  }
}