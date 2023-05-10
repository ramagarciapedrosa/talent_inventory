import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";
import { HomePage } from "../modules/pages/HomePage";
import { LoginAPI, StorageState } from "../apis/LoginAPI";

test.describe("Home page section", () => {
  let storageState: StorageState;
  let homePage: HomePage;

  test.beforeAll(async ({ browser }) => {
    const loginAPI = new LoginAPI(browser);
    storageState = await loginAPI.getStorageState(loginData.collab.mail, loginData.collab.password);
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({ storageState: storageState });
    const page = await context.newPage();
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test.afterEach(async ({ browser }) => {
    const contexts = browser.contexts();
    if (contexts.length >= 1) for (const context of contexts) await context.close();
  });

  test("Verify 'ADD YOUR SKILLS AND EXPERIENCE' button redirection", async () => {
    const skillsPage = await homePage.header.navigateToSkills();
    await skillsPage.check.url();
  });

  test("User can logout clicking the 'Logout' button", async () => {
    const loginPage = await homePage.logout();
    await loginPage.check.url();
  });
});
