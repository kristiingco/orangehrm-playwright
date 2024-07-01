import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly loginHeader: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly invalidCredentialsError: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.loginHeader = page.locator("h5");
        this.usernameField = page.getByPlaceholder("Username");
        this.passwordField = page.getByPlaceholder("Password");
        this.invalidCredentialsError = page.getByText("Invalid credentials");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async assertInLoginPage() {
        await expect(this.loginHeader).toBeVisible();
    }

    async assertInvalidCredentialsErrorMessageVisible() {
        await expect(this.invalidCredentialsError).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
