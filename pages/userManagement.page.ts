import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class UserManagementPage extends BasePage {
    readonly addUserButton: Locator;
    readonly userRecordsList: Locator;
    readonly userRoleSelect: Locator;
    readonly activeListBox: Locator;
    readonly searchButton: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.addUserButton = page.getByRole("button", { name: "Add" });
        this.userRecordsList = page.getByRole("table");
        this.userRoleSelect = page.locator(".oxd-select-wrapper").nth(0);
        this.activeListBox = page.getByRole("listbox");
        this.searchButton = page.getByRole("button", { name: "Search" });
    }

    async clickAddUserButton() {
        await this.addUserButton.click();
    }

    async assertInUserManagementPage() {
        await expect(this.page).toHaveURL(
            "/web/index.php/admin/viewSystemUsers"
        );
    }

    async filterUsersByRole(userRole: string) {
        await this.userRoleSelect.click();
        await this.activeListBox.getByText(userRole).click();
        await this.searchButton.click();
    }

    async assertInRecords(text: string) {
        await expect(this.userRecordsList).toContainText(text);
    }

    async assertNotInRecords(text: string) {
        await expect(this.userRecordsList).not.toContainText(text);
    }
}
