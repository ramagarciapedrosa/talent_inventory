import { test } from "../fixtures/loginPageFixture";
import { HomePage } from "../modules/pages/HomePage";
import loginData from "../data/loginData.json";
import { LoginAPI, StorageState } from "../apis/LoginAPI";

test.describe.configure({ mode: "serial" });

test.describe("Locators' sanity tests", () => {
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

  test("Verify header locators", async () => {
    await homePage.header.check.locatorsAreVisible();
  });

  test("Verify home locators", async () => {
    await homePage.check.locatorsAreVisible();
  });

  test("Verify skills locators", async () => {
    const skillsPage = await homePage.header.navigateToSkills();
    await skillsPage.check.locatorsAreVisible();

    const techSkillsPage = await skillsPage.navigateToTechSkills();
    await techSkillsPage.check.locatorsAreVisible();

    const toolsPage = await skillsPage.navigateToTools();
    await toolsPage.check.locatorsAreVisible();

    const industriesPage = await skillsPage.navigateToIndustries();
    await industriesPage.check.locatorsAreVisible();
  });
});
