import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";
import { TechSkillsAPI } from "../apis/TechSkillsAPI";
import { HomePage } from "../modules/pages/HomePage";
import { TechSkill, TechSkillsPage } from "../modules/pages/TechSkillsPage";
import { LoginAPI, StorageState } from "../apis/LoginAPI";

test.describe("Senser skills - Technical Skills section", () => {
  let techSkillsPage: TechSkillsPage;
  let storageState: StorageState;
  let techSkillsAPI: TechSkillsAPI;

  test.beforeAll(async ({ browser }) => {
    const loginAPI = new LoginAPI(browser);
    storageState = await loginAPI.getStorageState(loginData.collab.mail, loginData.collab.password);
    const credentials = await loginAPI.getCredentials(storageState);
    techSkillsAPI = new TechSkillsAPI(credentials);
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({ storageState: storageState });
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.navigate();
    const skillsPage = await homePage.header.navigateToSkills();
    techSkillsPage = await skillsPage.navigateToTechSkills();
  });

  test.afterEach(async ({ browser }) => {
    const contexts = browser.contexts();
    if (contexts.length >= 1) for (const context of contexts) await context.close();
  });

  // #41 -> 1,2,3,4
  test("Sucessful tech skill addition", async () => {
    const techSkill = await techSkillsAPI.getRandom();
    await techSkillsPage.addSkill(techSkill);
    await techSkillsPage.check.skillAdditionToast();
    await techSkillsPage.check.skillOnTable(techSkill);
  });

  test("Experience value limits", async () => {
    await techSkillsPage.setExperience(0);
    await techSkillsPage.check.xpUnderLimitMessage();
    await techSkillsPage.setExperience(100);
    await techSkillsPage.check.xpAboveLimitMessage();
  });

  test.describe("Tech skills modification tests", () => {
    let techSkill: TechSkill;

    test.beforeEach(async () => {
      techSkill = await techSkillsAPI.getRandom();
      await techSkillsPage.addSkill(techSkill);
      await techSkillsPage.check.skillAdditionToast();
      await techSkillsPage.check.skillOnTable(techSkill);
    });

    // #40 -> 12,17
    test("Modify existing tech skill", async () => {
      const mods = await techSkillsAPI.getRandomMods();
      await techSkillsPage.modifySkill(techSkill, mods);
      await techSkillsPage.check.skillAdditionToast();
      await techSkillsPage.check.skillModification(techSkill, mods);
    });

    // #40-86 -> 15
    test("Cancel tech skill deletion", async () => {
      await techSkillsPage.deleteSkill(techSkill, false);
      await techSkillsPage.check.skillOnTable(techSkill);
    });

    // #40-86 -> 13,14,16
    test("Delete tech skill from table", async () => {
      await techSkillsPage.deleteSkill(techSkill, true);
      await techSkillsPage.check.skillDeletionToast();
      await techSkillsPage.check.skillNotOnTable(techSkill);
    });
  });
});
