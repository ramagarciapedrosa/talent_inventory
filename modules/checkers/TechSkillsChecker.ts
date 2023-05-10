import { Page, expect } from "@playwright/test";
import { TechSkill, TechSkillMod } from "../pages/TechSkillsPage";
import { parseTechSkillFields } from "../../utils/skillsParser";
import { TechSkillsLocator } from "../locators/TechSkillsLocator";

export class TechSkillsChecker {
  readonly page: Page;
  readonly locate: TechSkillsLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new TechSkillsLocator(page);
  }

  async skillAdditionToast() {
    await expect(this.locate.skillAdditionToast).toBeVisible();
  }

  async skillDeletionToast() {
    await expect(this.locate.skillDeletionToast).toBeVisible();
  }

  async skillOnTable(skill: TechSkill) {
    const locatorText = parseTechSkillFields(skill);
    const newSkill = this.page.getByText(locatorText);
    await expect(newSkill).toBeVisible();
  }

  async skillNotOnTable(skill: TechSkill) {
    const locatorText = parseTechSkillFields(skill);
    await expect(this.page.getByText(locatorText)).not.toBeVisible();
  }

  async skillModification(skill: TechSkill, modification: TechSkillMod) {
    if (modification.level) skill.level = modification.level;
    if (modification.experience) skill.experience = modification.experience;
    if (typeof modification.hasCertification === "boolean")
      skill.hasCertification = modification.hasCertification;
    if (typeof modification.canTeach === "boolean") skill.canTeach = modification.canTeach;
    const locatorText = parseTechSkillFields(skill);
    await expect(this.page.getByText(locatorText)).toBeVisible();
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

  async locatorsAreVisible() {
    await expect(this.locate.skill).toBeVisible();
    await expect(this.locate.level).toBeVisible();
    await expect(this.locate.experience).toBeVisible();
    await expect(this.locate.hasCertification).toBeVisible();
    await expect(this.locate.canTeach).toBeVisible();
    await expect(this.locate.submitButton).toBeVisible();
  }
}
