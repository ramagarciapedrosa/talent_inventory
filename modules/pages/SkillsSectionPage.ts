import { Page } from "@playwright/test";
import { SkillsSectionChecker } from "../checkers/SkillsSectionChecker";
import { SkillsSectionLocator } from "../locators/SkillsSectionLocator";
import { HeaderPage } from "./HeaderPage";
import { TechSkillsPage } from "./TechSkillsPage";
import { ToolsPage } from "./ToolsPage";
import { IndustriesPage } from "./IndustriesPage";

export class SkillsSectionPage {
  readonly page: Page;
  readonly locate: SkillsSectionLocator;
  readonly check: SkillsSectionChecker;
  readonly header: HeaderPage;

  constructor(page: Page) {
    this.page = page;
    this.locate = new SkillsSectionLocator(page);
    this.check = new SkillsSectionChecker(page);
    this.header = new HeaderPage(page);
  }

  async navigateToTechSkills() {
    await this.locate.techSkillsSection.click();
    await this.page.waitForLoadState("networkidle");
    return new TechSkillsPage(this.page);
  }

  async navigateToTools() {
    await this.locate.toolsSection.click();
    await this.page.waitForLoadState("networkidle");
    return new ToolsPage(this.page);
  }

  async navigateToIndustries() {
    await this.locate.industriesSection.click();
    await this.page.waitForLoadState("networkidle");
    return new IndustriesPage(this.page);
  }
}
