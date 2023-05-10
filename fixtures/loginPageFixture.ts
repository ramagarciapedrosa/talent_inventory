import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../modules/pages/LoginPage";

type pages = {
  loginPage: LoginPage;
};

const testPages = baseTest.extend<pages>({
  loginPage: async ({ page }, use) => {
    await page.goto("/");
    await use(new LoginPage(page));
  },
});

export const test = testPages;
