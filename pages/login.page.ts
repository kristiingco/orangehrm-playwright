import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly loginHeader: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.loginHeader = page.locator("h5");
        this.usernameField = page.getByLabel("Username");
        this.passwordField = page.getByLabel("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async assertInLoginPage() {
        await expect(this.loginHeader).toBeVisible();
    }
}
