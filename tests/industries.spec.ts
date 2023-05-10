import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";
import { IndustriesAPI } from "../apis/IndustriesAPI";
import { IndustriesPage, Industry } from "../modules/pages/IndustriesPage";
import { HomePage } from "../modules/pages/HomePage";
import { LoginAPI, StorageState } from "../apis/LoginAPI";

test.describe("Senser skills - Industries section", () => {
  let industriesPage: IndustriesPage;
  let storageState: StorageState;
  let industriesAPI: IndustriesAPI;

  test.beforeAll(async ({ browser }) => {
    const loginAPI = new LoginAPI(browser);
    storageState = await loginAPI.getStorageState(loginData.collab.mail, loginData.collab.password);
    const credentials = await loginAPI.getCredentials(storageState);
    industriesAPI = new IndustriesAPI(credentials);
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({ storageState: storageState });
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.navigate();
    const skillsPage = await homePage.header.navigateToSkills();
    industriesPage = await skillsPage.navigateToIndustries();
  });

  test.afterEach(async ({ browser }) => {
    const contexts = browser.contexts();
    if (contexts.length >= 1) for (const context of contexts) await context.close();
  });

  test("Sucessful industry addition", async () => {
    const industry = await industriesAPI.getRandom();
    await industriesPage.addIndustry(industry);
    await industriesPage.check.industryAdditionToast();
    await industriesPage.check.industryOnTable(industry);
  });

  test("Experience value limits", async () => {
    await industriesPage.setExperience(0);
    await industriesPage.check.xpUnderLimitMessage();
    await industriesPage.setExperience(100);
    await industriesPage.check.xpAboveLimitMessage();
  });

  test.describe("Industry modification tests", () => {
    let industry: Industry;

    test.beforeEach(async () => {
      industry = await industriesAPI.getRandom();
      await industriesPage.addIndustry(industry);
      await industriesPage.check.industryAdditionToast();
      await industriesPage.check.industryOnTable(industry);
    });

    test("Modify existing industry", async () => {
      const mods = await industriesAPI.getRandomMods();
      await industriesPage.modifyIndustry(industry, mods);
      await industriesPage.check.industryAdditionToast();
      await industriesPage.check.industryModification(industry, mods);
    });

    test("Cancel industry deletion", async () => {
      await industriesPage.deleteIndustry(industry, false);
      await industriesPage.check.industryOnTable(industry);
    });

    test("Delete industry from table", async () => {
      await industriesPage.deleteIndustry(industry, true);
      await industriesPage.check.industryDeletionToast();
      await industriesPage.check.industryNotOnTable(industry);
    });
  });
});
