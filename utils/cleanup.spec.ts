import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";
import { SkillsSectionPage } from "../modules/pages/SkillsSectionPage";
import { LoginAPI, StorageState } from "../apis/LoginAPI";
import { HomePage } from "../modules/pages/HomePage";
import { TechSkillsPage } from "../modules/pages/TechSkillsPage";
import { ToolsPage } from "../modules/pages/ToolsPage";
import { IndustriesPage } from "../modules/pages/IndustriesPage";

test.describe.configure({ timeout: 0 });

test.describe("Cleanup tests", () => {
  let storageState: StorageState;
  let skillsPage: SkillsSectionPage;

  test.beforeAll(async ({ browser }) => {
    const loginAPI = new LoginAPI(browser);
    storageState = await loginAPI.getStorageState(loginData.collab.mail, loginData.collab.password);
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({ storageState: storageState });
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.navigate();
    skillsPage = await homePage.header.navigateToSkills();
  });

  test.afterEach(async ({ browser }) => {
    const contexts = browser.contexts();
    if (contexts.length >= 1) for (const context of contexts) await context.close();
  });

  test("Tech skills cleanup", async () => {
    const techSkillsPage = await skillsPage.navigateToTechSkills();
    await deleteAllSkills(techSkillsPage);
  });

  test("Tools cleanup", async () => {
    const toolsPage = await skillsPage.navigateToTools();
    await deleteAllSkills(toolsPage);
  });

  test("Industries cleanup", async () => {
    const industriesPage = await skillsPage.navigateToIndustries();
    await deleteAllSkills(industriesPage);
  });
});

async function deleteAllSkills(page: TechSkillsPage | ToolsPage | IndustriesPage) {
  while (await page.locate.skillsList.isVisible()) {
    const deleteButton = page.page.locator("svg:nth-child(2) > svg > path:nth-child(3)").first();
    await deleteButton.waitFor();
    await deleteButton.click({ force: true, delay: 500 });
    await page.locate.deletionConfirmButton.click();
  }
}
