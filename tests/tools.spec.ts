import { test } from "../fixtures/loginPageFixture";
import loginData from "../data/loginData.json";
import { ToolsAPI } from "../apis/ToolsAPI";
import { Tool, ToolsPage } from "../modules/pages/ToolsPage";
import { HomePage } from "../modules/pages/HomePage";
import { LoginAPI, StorageState } from "../apis/LoginAPI";

test.describe("Senser skills - Tools section", () => {
  let storageState: StorageState;
  let toolsPage: ToolsPage;
  let toolsAPI: ToolsAPI;

  test.beforeAll(async ({ browser }) => {
    const loginAPI = new LoginAPI(browser);
    storageState = await loginAPI.getStorageState(loginData.collab.mail, loginData.collab.password);
    const credentials = await loginAPI.getCredentials(storageState);
    toolsAPI = new ToolsAPI(credentials);
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({ storageState: storageState });
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.navigate();
    const skillsPage = await homePage.header.navigateToSkills();
    toolsPage = await skillsPage.navigateToTools();
  });

  test.afterEach(async ({ browser }) => {
    const contexts = browser.contexts();
    if (contexts.length >= 1) for (const context of contexts) await context.close();
  });

  // #42 -> 2,3,4,5,6,7
  test("Sucessful tool addition", async () => {
    const tool = await toolsAPI.getRandom();
    await toolsPage.addTool(tool);
    await toolsPage.check.toolAdditionToast();
    await toolsPage.check.toolOnTable(tool);
  });

  test("Experience value limits", async () => {
    await toolsPage.setExperience(0);
    await toolsPage.check.xpUnderLimitMessage();
    await toolsPage.setExperience(100);
    await toolsPage.check.xpAboveLimitMessage();
  });

  test.describe("Tool modification tests", () => {
    let tool: Tool;

    test.beforeEach(async () => {
      tool = await toolsAPI.getRandom();
      await toolsPage.addTool(tool);
      await toolsPage.check.toolAdditionToast();
      await toolsPage.check.toolOnTable(tool);
    });

    test("Modify existing tool", async () => {
      const mods = await toolsAPI.getRandomMods();
      await toolsPage.modifyTool(tool, mods);
      await toolsPage.check.toolAdditionToast();
      await toolsPage.check.toolModification(tool, mods);
    });

    test("Cancel tool deletion", async () => {
      await toolsPage.deleteTool(tool, false);
      await toolsPage.check.toolOnTable(tool);
    });

    test("Delete tech skill from table", async () => {
      await toolsPage.deleteTool(tool, true);
      await toolsPage.check.toolDeletionToast();
      await toolsPage.check.toolNotOnTable(tool);
    });
  });
});
