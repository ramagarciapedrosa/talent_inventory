import { Page } from "@playwright/test";
import { ToolsChecker } from "../checkers/ToolsChecker";
import { ToolsLocator } from "../locators/ToolsLocator";

export type Tool = {
  name: string;
  level: string;
  experience: number;
  canTeach: boolean;
};

export type ToolMod = {
  level?: string;
  experience?: number;
  canTeach?: boolean;
};

export class ToolsPage {
  readonly page: Page;
  readonly locate: ToolsLocator;
  readonly check: ToolsChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new ToolsLocator(page);
    this.check = new ToolsChecker(page);
  }

  async addTool(tool: Tool) {
    await this.check.submitButtonIsDisabled();
    await this.setTool(tool.name);
    await this.check.submitButtonIsDisabled();
    await this.setLevel(tool.level);
    await this.check.submitButtonIsDisabled();
    await this.setExperience(tool.experience);
    await this.check.submitButtonIsEnabled();
    if (tool.canTeach) await this.locate.canTeach.check();
    await this.locate.submitButton.click();
  }

  async setExperience(experience: number) {
    await this.locate.experience.fill(`${experience}`);
  }

  async setTool(toolName: string) {
    await this.locate.tool.click();
    await this.locate.tool.type(toolName);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async setLevel(level: string) {
    await this.locate.level.click();
    await this.locate.levelOption(level).click();
  }

  async modifyTool(tool: Tool, fieldsToChange: ToolMod) {
    await this.locate.modifyButton(tool).click();
    if (fieldsToChange.level) await this.setLevel(fieldsToChange.level);
    if (fieldsToChange.experience) await this.setExperience(fieldsToChange.experience);
    if (fieldsToChange.canTeach) await this.locate.canTeach.check();
    else if (fieldsToChange.canTeach === false) await this.locate.canTeach.uncheck();
    await this.locate.updateButton.click();
  }

  async deleteTool(tool: Tool, confirm: boolean) {
    await this.locate.deleteButton(tool).click();
    if (confirm) await this.locate.deletionConfirmButton.click();
    else await this.locate.deletionCancelButton.click();
  }
}
