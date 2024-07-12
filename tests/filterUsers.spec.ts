import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { SidePanel } from "../components/sidePanel.component";
import { UserManagementPage } from "../pages/userManagement.page";
import { Navbar } from "../components/navbar.component";
import constants from "../constants";

test.describe("Filter users", () => {
    let loginPage: LoginPage;
    let sidePanel: SidePanel;
    let userManagementPage: UserManagementPage;
    const { VALID_USERNAME, VALID_PASSWORD } = constants;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page, "/web/index.php/auth/login");
        await loginPage.visit();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        sidePanel = new SidePanel(page);
        await sidePanel.clickOnAction("Admin");
        userManagementPage = new UserManagementPage(
            page,
            "/web/index.php/admin/viewSystemUsers"
        );
    });

    test("User Management page loads", async ({ page }) => {
        const navbar = new Navbar(page);
        await navbar.assertTextInNavbar("User Management");
    });

    test("Filter users by User Role", async () => {
        await userManagementPage.filterUsersByRole("ESS");
        await userManagementPage.assertInRecords("ESS");
        await userManagementPage.assertNotInRecords("Admin");
    });

    test("Filter users by User Status", async () => {
        await userManagementPage.filterUsersByStatus("Enabled");
        await userManagementPage.assertInRecords("Enabled");
        await userManagementPage.assertNotInRecords("Disabled");
    });
});
