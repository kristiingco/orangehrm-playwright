import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class PIMPage extends BasePage {
    readonly addEmployeeButton: Locator;
    readonly employeeList: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.addEmployeeButton = page.getByText("Add Employee");
        this.employeeList = page.locator(".oxd-table-body");
    }

    async clickAddEmployeeButton() {
        await this.addEmployeeButton.click();
    }

    async assertEmployeeInEmployeeList(id: string) {
        await expect(this.employeeList).toContainText(id);
    }
}
