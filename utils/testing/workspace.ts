import puppeteer, { Browser, Page } from "puppeteer";
import { BeforeAll, AfterAll, Before, After } from "cucumber";

BeforeAll(async () => {
    browser = await puppeteer.launch({
        // headless: false,
        args: [ "--no-sandbox", "--font-render-hinting=none" ],
        timeout: 8000
    });
});

AfterAll(async () => {
    await browser.close();
});

let browser!: Browser;
let page!: Page;

Before(async () => {
    const context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();
});

After(async () => {
    await page.close();
});

export class Workspace {

    public get currentPage() {
        return page;
    }
}
