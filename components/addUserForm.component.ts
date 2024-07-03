import { Page, Locator, expect } from "@playwright/test";

export class AddUserForm {
    readonly page: Page;
    readonly addUserForm: Locator;
    readonly userRoleSelect: Locator;
    readonly employeeNameInput: Locator;
    readonly statusSelect: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly activeListBox: Locator;
    readonly saveUserButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userRoleSelect = page.locator(".oxd-select-wrapper").nth(0);
        this.employeeNameInput = page.getByPlaceholder("Type for hints...");
        this.statusSelect = page.locator(".oxd-select-wrapper").nth(1);
        this.usernameInput = page.locator(".oxd-input").nth(1);
        this.passwordInput = page.locator(".oxd-input").nth(2);
        this.confirmPasswordInput = page.locator(".oxd-input").nth(3);
        this.activeListBox = page.getByRole("listbox");
        this.saveUserButton = page.getByRole("button", {
            name: "Save",
        });
    }

    async fillOutAddUserForm(
        userRole: string,
        employeeName: string,
        status: string,
        username: string,
        password: string
    ) {
        await this.userRoleSelect.click();
        await this.activeListBox.getByText(userRole).click();
        await this.employeeNameInput.pressSequentially(employeeName);
        await this.activeListBox.getByText(employeeName).click();
        await this.statusSelect.click();
        await this.activeListBox.getByText(status).click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.saveUserButton.click();
        await this.page.waitForURL("/web/index.php/admin/viewSystemUsers");
    }
}
