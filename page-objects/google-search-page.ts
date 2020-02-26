import { PageObject } from "./page-object";

export class GoogleSearchPage extends PageObject {

    public async clickSearch() {
        const searchButton = await this.findElements("[aria-label='Google Search']");
        await searchButton[searchButton.length - 1].click();
    }

    public get searchInput() {
        return this.findSingleElement("input[type='text']");
    }

    public get resultLinks() {
        return this.findElements("#search a");
    }

    public static url = "https://www.google.com";
}
