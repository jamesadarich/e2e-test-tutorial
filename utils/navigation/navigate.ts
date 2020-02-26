import { Page } from "puppeteer";

import { PageObject } from "../../page-objects/page-object";

type PageObjectType<T extends PageObject> = { url: string } & (new (page: Page) => T);


export async function navigate<T extends PageObject>(page: Page, location: PageObjectType<T>): Promise<T> {
    await page.goto(location.url, { waitUntil: "networkidle0", timeout: 10000 });
    return new location(page);
}
