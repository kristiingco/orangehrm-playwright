import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/login.page";
import { SidePanel } from "../components/sidePanel.component";
import { UserManagementPage } from "../pages/userManagement.page";
import { Navbar } from "../components/navbar.component";
import constants from "../constants";
import { AddUserForm } from "../components/addUserForm.component";

test.describe("Add new user", () => {
    let loginPage: LoginPage;
    let sidePanel: SidePanel;
    let userManagementPage: UserManagementPage;
    let addUserForm: AddUserForm;
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
        addUserForm = new AddUserForm(page);
    });

    test("User Management Page Loads", async ({ page }) => {
        const navbar = new Navbar(page);
        await navbar.assertTextInNavbar("User Management");
    });

    test("Add new user", async () => {
        const newUserData = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
        };

        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            "Admin",
            "Amelia Brown",
            "Disabled",
            newUserData.username,
            newUserData.password
        );
        await userManagementPage.assertInRecords(newUserData.username);
    });
});