import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";

test.describe("Login Page section", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("Verify url", async ({ loginPage }) => {
    await loginPage.check.url();
  });

  test("Verify login with Collab MS account", async ({ loginPage }) => {
    const homePage = await loginPage.login(loginData.collab.mail, loginData.collab.password);
    await homePage.check.url();
  });

  test("Verify non-MS account does not login after cancellation", async ({ loginPage }) => {
    await loginPage.invalidLogin(loginData.invalid.mail, loginData.invalid.password, false);
    await loginPage.check.url();
  });
});
