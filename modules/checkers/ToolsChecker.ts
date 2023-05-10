import { Page, expect } from "@playwright/test";
import { parseToolFields } from "../../utils/skillsParser";
import { Tool, ToolMod } from "../pages/ToolsPage";
import { ToolsLocator } from "../locators/ToolsLocator";

export class ToolsChecker {
  readonly page: Page;
  readonly locate: ToolsLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new ToolsLocator(page);
  }

  async locatorsAreVisible() {
    await expect(this.locate.tool).toBeVisible();
    await expect(this.locate.level).toBeVisible();
    await expect(this.locate.experience).toBeVisible();
    await expect(this.locate.canTeach).toBeVisible();
    await expect(this.locate.submitButton).toBeVisible();
  }

  async toolModification(tool: Tool, modification: ToolMod) {
    if (modification.level) tool.level = modification.level;
    if (modification.experience) tool.experience = modification.experience;
    if (typeof modification.canTeach === "boolean") tool.canTeach = modification.canTeach;
    const locatorText = parseToolFields(tool);
    await expect(this.page.getByText(locatorText)).toBeVisible();
  }

  async toolAdditionToast() {
    await expect(this.locate.toolAdditionToast).toBeVisible();
  }

  async toolDeletionToast() {
    await expect(this.locate.toolDeletionToast).toBeVisible();
  }

  async toolOnTable(tool: Tool) {
    const locatorText = parseToolFields(tool);
    await expect(this.page.getByText(locatorText)).toBeVisible();
  }

  async toolNotOnTable(tool: Tool) {
    const locatorText = parseToolFields(tool);
    await expect(this.page.getByText(locatorText)).not.toBeVisible();
  }

  async submitButtonIsDisabled() {
    await expect(this.locate.submitButton).toBeDisabled();
  }

  async submitButtonIsEnabled() {
    await expect(this.locate.submitButton).toBeEnabled();
  }

  async xpUnderLimitMessage() {
    await expect(this.locate.underLimitMessage).toBeVisible();
  }

  async xpAboveLimitMessage() {
    await expect(this.locate.aboveLimitMessage).toBeVisible();
  }
}
