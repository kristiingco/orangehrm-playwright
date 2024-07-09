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
    const {
        VALID_USERNAME,
        VALID_PASSWORD,
        NEW_USER_ROLE,
        NEW_USER_EMPLOYEE_NAME,
        NEW_USER_STATUS,
        NEW_USERNAME,
        NEW_PASSWORD,
    } = constants;

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

    test("Add new user", async ({ page }) => {
        const newUserData = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
        };

        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            NEW_USER_ROLE,
            NEW_USER_EMPLOYEE_NAME,
            NEW_USER_STATUS,
            newUserData.username,
            newUserData.password
        );
        await page.waitForURL("/web/index.php/admin/viewSystemUsers");
        await userManagementPage.assertInRecords(newUserData.username);
    });

    test("No user role selected", async () => {
        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            "-- Select --",
            NEW_USER_EMPLOYEE_NAME,
            NEW_USER_STATUS,
            NEW_USERNAME,
            NEW_PASSWORD
        );
        await addUserForm.assertRequiredErrorVisible();
    });

    test("No employee name provided", async () => {
        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            NEW_USER_ROLE,
            "",
            NEW_USER_STATUS,
            NEW_USERNAME,
            NEW_PASSWORD
        );
        await addUserForm.assertRequiredErrorVisible();
    });

    test("No user role provided", async () => {
        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            NEW_USER_ROLE,
            NEW_USER_EMPLOYEE_NAME,
            "-- Select --",
            NEW_USERNAME,
            NEW_PASSWORD
        );
        await addUserForm.assertRequiredErrorVisible();
    });

    test("No username provided", async () => {
        await userManagementPage.clickAddUserButton();
        await addUserForm.fillOutAddUserForm(
            NEW_USER_ROLE,
            NEW_USER_EMPLOYEE_NAME,
            NEW_USER_STATUS,
            "",
            NEW_PASSWORD
        );
        await addUserForm.assertRequiredErrorVisible();
    });
});
