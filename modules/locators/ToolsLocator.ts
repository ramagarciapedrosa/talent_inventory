import { Locator, Page } from "@playwright/test";
import { parseToolFields } from "../../utils/skillsParser";
import { Tool } from "../pages/ToolsPage";
import { SkillsSectionLocator } from "./SkillsSectionLocator";

export class ToolsLocator extends SkillsSectionLocator {
  readonly page: Page;

  // Form elements
  readonly tool: Locator;
  readonly level: Locator;
  readonly experience: Locator;
  readonly canTeach: Locator;

  // Toast messages
  readonly toolAdditionToast: Locator;
  readonly toolDeletionToast: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.tool = page.locator("#tool");
    this.level = page.locator("#levelId");
    this.experience = page.locator("#yearsExperience");
    this.canTeach = page.locator("#canTeach");

    this.toolAdditionToast = page.locator(
      "div[role='alert']:has-text('The tool was added and saved successfully')"
    );
    this.toolDeletionToast = page.locator(
      "div[role='alert']:has-text('The tool was removed successfully')"
    );
  }

  levelOption(level: string) {
    return this.page.getByRole("option").getByText(level, { exact: true });
  }

  modifyButton(tool: Tool) {
    const locatorText = parseToolFields(tool);
    return this.page.getByText(locatorText).locator("svg").first();
  }

  deleteButton(tool: Tool) {
    const locatorText = parseToolFields(tool);
    return this.page.getByText(locatorText).locator("svg").last();
  }
}
