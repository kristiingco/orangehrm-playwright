import { Page, Locator, expect } from "@playwright/test";

export class Navbar {
    readonly page: Page;
    readonly navbar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbar = page.locator(".oxd-topbar");
    }

    async assertNavbarIsVisible() {
        await expect(this.navbar).toBeVisible();
    }
}
