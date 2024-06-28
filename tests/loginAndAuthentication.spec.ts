import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login and Authentication", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page, "/web/index.php/auth/login");
        await loginPage.visit();
    });

    test("Login page loads", async () => {
        await loginPage.assertInLoginPage();
    });
});
