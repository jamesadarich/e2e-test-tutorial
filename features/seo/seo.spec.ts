import { given, when, binding, then } from "cucumber-tsflow";
import { expect } from "chai";

import { Workspace } from "../../utils/testing/workspace";
import { GoogleSearchPage } from "../../page-objects/google-search-page";
import { navigate } from "../../utils/navigation/navigate";
import { getScreenshotDiff } from "../../utils/screenshots/get-screenshot-diff";

@binding([ Workspace ])
export class NewSearchSteps {

    private workspace: Workspace;
    private googlePage!: GoogleSearchPage;

    constructor(workspace: Workspace) {
        this.workspace = workspace;
    }

    @given(/the user navigates to Google/)
    public async userNavigatesToGoogle() {
        this.googlePage = await navigate(this.workspace.currentPage, GoogleSearchPage);
    }

    @when(/the user types "(.*)" into the search bar/)
    public async userTypeSearchTerm(searchTerm: string) {
        const searchInput = await this.googlePage.searchInput;
        searchInput.type(searchTerm);
    }

    @when(/the user clicks "search"/)
    public async uesrClicksSearch() {
        await this.googlePage.clickSearch();
    }

    @when(/the user clicks the first result/)
    public async userClicksFirstResult() {
        const resultLinks = await this.googlePage.resultLinks;

        const firstResultLink = resultLinks[0];

        await firstResultLink.click();
    }

    @then(/the user should be on the GitHub website/)
    public async userShouldBeOnGitHubWebsite() {
        const currentPage = this.workspace.currentPage;

        await currentPage.waitForNavigation();

        expect(currentPage.url()).to.equal("https://github.com/");
    }

    @then(/the page should match the current snapshot for "(.*)"/)
    public async pageSnapshotsMatch(imageName: string) {
        const currentPage = this.workspace.currentPage;

        const { percentageDiff } = await getScreenshotDiff(currentPage, `${__dirname}/screenshots/${imageName}`);

        expect(percentageDiff).to.equal(0);
    }
}
