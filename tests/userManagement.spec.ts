import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { SidePanel } from "../components/sidePanel.component";
import { Navbar } from "../components/navbar.component";
import constants from "../constants";

test.describe("User Management", () => {
    let loginPage: LoginPage;
    let sidePanel: SidePanel;
    const { VALID_USERNAME, VALID_PASSWORD } = constants;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page, "/web/index.php/auth/login");
        await loginPage.visit();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        sidePanel = new SidePanel(page);
    });

    test("User Management Page Loads", async ({ page }) => {
        await sidePanel.clickOnAction("Admin");
        const navbar = new Navbar(page);
        await navbar.assertTextInNavbar("User Management");
    });
});
