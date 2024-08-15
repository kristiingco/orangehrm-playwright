import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { SidePanel } from "../components/sidePanel.component";
import { PIMPage } from "../pages/PIM.page";
import { Navbar } from "../components/navbar.component";
import { AddEmployeeForm } from "../components/addEmployeeForm.component";

import constants from "../constants";

test.describe("Add new employee", () => {
    let loginPage: LoginPage;
    let sidePanel: SidePanel;
    let pimPage: PIMPage;
    let addEmployeeForm: AddEmployeeForm;

    const { VALID_USERNAME, VALID_PASSWORD } = constants;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page, "/web/index.php/auth/login");
        await loginPage.visit();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        sidePanel = new SidePanel(page);
        await sidePanel.clickOnAction("PIM");
        pimPage = new PIMPage(page, "/web/index.php/pim/viewEmployeeList");
        addEmployeeForm = new AddEmployeeForm(page);
    });

    test("PIM Page Loads", async ({ page }) => {
        const navbar = new Navbar(page);
        await navbar.assertTextInNavbar("PIM");
    });

    test("Employee Id field is prefilled", async () => {
        await pimPage.clickAddEmployeeButton();
        await addEmployeeForm.assertInputInEmployeeIdInput();
    });
});
