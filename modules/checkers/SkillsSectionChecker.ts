import { Page, expect } from "@playwright/test";
import { SkillsSectionLocator } from "../locators/SkillsSectionLocator";

export class SkillsSectionChecker {
  readonly page: Page;
  readonly locate: SkillsSectionLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new SkillsSectionLocator(page);
  }

  async url() {
    await expect(this.page).toHaveURL("https://dev.talent-inventory.ms-innovation.link/skills");
  }

  async locatorsAreVisible() {
    await expect(this.locate.techSkillsSection).toBeVisible();
    await expect(this.locate.toolsSection).toBeVisible();
    await expect(this.locate.industriesSection).toBeVisible();
  }
}
