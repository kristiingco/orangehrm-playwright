import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class UserManagementPage extends BasePage {
    readonly addUserButton: Locator;
    readonly userRecordsList: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.addUserButton = page.getByRole("button", { name: "Add" });
        this.userRecordsList = page.getByRole("table");
    }

    async clickAddUserButton() {
        await this.addUserButton.click();
    }

    async assertInRecords(username: string) {
        await expect(this.userRecordsList).toContainText(username);
    }
}
