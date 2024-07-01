import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { Navbar } from "../components/navbar.component";
import constants from "../constants";

test.describe("Login and Authentication", () => {
    const {
        VALID_USERNAME,
        VALID_PASSWORD,
        INVALID_USERNAME,
        INVALID_PASSWORD,
    } = constants;

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page, "/web/index.php/auth/login");
        await loginPage.visit();
    });

    test("Login page loads", async () => {
        await loginPage.assertInLoginPage();
    });

    test("Valid login", async ({ page }) => {
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        let navbar: Navbar = new Navbar(page);
        await navbar.assertNavbarIsVisible();
    });

    test("Invalid username", async () => {
        await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
        await loginPage.assertInvalidCredentialsErrorMessageVisible();
    });

    test("Invalid password", async () => {
        await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);
        await loginPage.assertInvalidCredentialsErrorMessageVisible();
    });
});
