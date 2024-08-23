import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class RecruitmentPage extends BasePage {
    readonly addCandidateButton: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.addCandidateButton = page.getByText("Add");
    }

    async clickAddEmployeeButton() {
        await this.addCandidateButton.click();
    }
}
