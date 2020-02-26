import puppeteer, { Browser, Page } from "puppeteer";
import { BeforeAll, AfterAll } from "cucumber";

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

export class Workspace {
    private page!: Page;

    public async getPage() {
        return this.page || (this.page = await browser.newPage());
    }
}
