import { Page, Locator, expect } from "@playwright/test";

export class AddEmployeeForm {
    readonly page: Page;
    readonly employeeFirstNameInput: Locator;
    readonly employeeMiddleNameInput: Locator;
    readonly employeeLastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly createLoginDetailsCheckbox: Locator;
    readonly saveUserButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employeeFirstNameInput = page.getByPlaceholder("First Name");
        this.employeeMiddleNameInput = page.getByPlaceholder("Middle Name");
        this.employeeLastNameInput = page.getByPlaceholder("Last Name");
        this.employeeIdInput = page
            .locator(".orangehrm-employee-form .oxd-input")
            .last();
        this.createLoginDetailsCheckbox = page.getByRole("checkbox");
        this.saveUserButton = page.getByRole("button", {
            name: "Save",
        });
        this.cancelButton = page.getByRole("button", {
            name: "Cancel",
        });
    }

    async fillOutAddEmployeeForm(
        employeeFirstName: string,
        employeeMiddleName: string,
        employeeLastName: string
    ) {
        await this.employeeFirstNameInput.fill(employeeFirstName);
        await this.employeeMiddleNameInput.fill(employeeMiddleName);
        await this.employeeLastNameInput.fill(employeeLastName);
        await this.saveUserButton.click();
    }

    async clickCreateLoginDetailsCheckbox() {
        await this.createLoginDetailsCheckbox.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async getEmployeeIdInput() {
        await this.page.inputValue(".orangehrm-employee-form .oxd-input");
    }

    async assertInputInEmployeeIdInput() {
        await expect(this.employeeIdInput).not.toBeEmpty();
    }
}
