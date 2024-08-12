import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PIMPage extends BasePage {
    readonly addEmployeeButton: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.addEmployeeButton = page.getByText("Add Employee");
    }

    async clickAddEmployeeButton() {
        await this.addEmployeeButton.click();
    }
}
