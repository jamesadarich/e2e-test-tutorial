import { Page } from "puppeteer";

export abstract class PageObject {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public static location: string;

    protected async findElements(selector: string) {

        await this.page.waitFor(selector, { timeout: 5000 });

        return this.page.$$(selector);
    }

    protected async findSingleElement(selector: string) {

        const elements = await this.findElements(selector);

        if (elements.length > 1) {
            throw new Error(`selector "${selector}" is not unique in the current context.`);
        }

        return elements[0];
    }
}
