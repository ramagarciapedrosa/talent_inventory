import { Locator, Page } from "@playwright/test";
import { parseTechSkillFields } from "../../utils/skillsParser";
import { TechSkill } from "../pages/TechSkillsPage";
import { SkillsSectionLocator } from "./SkillsSectionLocator";

export class TechSkillsLocator extends SkillsSectionLocator {
  readonly page: Page;

  // Form elements
  readonly skill: Locator;
  readonly experience: Locator;
  readonly level: Locator;
  readonly hasCertification: Locator;
  readonly canTeach: Locator;

  // Toast messages
  readonly skillAdditionToast: Locator;
  readonly skillDeletionToast: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.skill = page.locator("#skill");
    this.level = page.locator("#levelId");
    this.experience = page.locator("#yearsExperience");
    this.hasCertification = page.locator("#isCertified");
    this.canTeach = page.locator("#canTeach");

    this.skillAdditionToast = page.locator(
      "div[role='alert']:has-text('The skill was added and saved successfully')"
    );
    this.skillDeletionToast = page.locator(
      "div[role='alert']:has-text('The skill was removed successfully')"
    );
  }

  levelOption(level: string) {
    return this.page.getByRole("option").getByText(level, { exact: true });
  }

  modifyButton(skill: TechSkill) {
    const locatorText = parseTechSkillFields(skill);
    return this.page.getByText(locatorText).locator("svg").first();
  }

  deleteButton(skill: TechSkill) {
    const locatorText = parseTechSkillFields(skill);
    return this.page.getByText(locatorText).locator("svg").last();
  }
}
