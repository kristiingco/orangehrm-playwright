import { Page, Locator, expect } from "@playwright/test";

export class SidePanel {
    readonly page: Page;
    readonly sidePanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidePanel = page.locator(".oxd-sidepanel");
    }

    async clickOnAction(action: string) {
        await this.sidePanel.getByText(action).click();
    }
}
