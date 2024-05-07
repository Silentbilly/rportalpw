import { BeforeAll, Before, After, AfterAll } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import config from '../../core/resources/config.json';
import { invokeBrowser } from "../../core/utils/browserManager";
import { LoginPage } from "../../business/page-objects/LoginPage";
import { SideBar } from "../../business/page-objects/components/SideBar";
import { RP_PASSWORD, RP_USERNAME } from "../../core/resources/envParameters";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
    browser = await invokeBrowser();
});

Before({ tags: '@noAuth' }, async () => {
    context = await browser.newContext({
      viewport: null
    });
    const page = await context.newPage();
    fixture.page = page;

    await page.goto(config.baseUrl);
});

Before({ tags: '@dashboards' }, async () => {
    context = await browser.newContext({
      viewport: null
    });
    const page = await context.newPage();
    fixture.page = page;
    const loginPage = new LoginPage(page);
    const sideBar = new SideBar(page);

    await page.goto(config.baseUrl);
    await loginPage.login(RP_USERNAME, RP_PASSWORD);
    await sideBar.clickOn(sideBar.dashboardsButton);
});

After(async () => {
    await fixture.page.close();
    await context.close();
});

AfterAll(async () => {
    await browser.close();
});