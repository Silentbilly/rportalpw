import { BeforeAll, Before, After, AfterAll } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import config from '../../core/resources/config.json';
import { invokeBrowser } from "../../core/utils/browserManager";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
    browser = await invokeBrowser();
});

Before(async () => {
    context = await browser.newContext({
      viewport: null
    });
    const page = await context.newPage();
    fixture.page = page;

    await page.goto(config.baseUrl);
});

After(async () => {
    await fixture.page.close();
    await context.close();
});

AfterAll(async () => {
    await browser.close();
});