import { Page } from "@playwright/test";
import { TechSkillsChecker } from "../checkers/TechSkillsChecker";
import { TechSkillsLocator } from "../locators/TechSkillsLocator";

export type TechSkill = {
  name: string;
  level: string;
  experience: number;
  hasCertification: boolean;
  canTeach: boolean;
};

export type TechSkillMod = {
  level?: string;
  experience?: number;
  hasCertification?: boolean;
  canTeach?: boolean;
};

export class TechSkillsPage {
  readonly page: Page;
  readonly locate: TechSkillsLocator;
  readonly check: TechSkillsChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new TechSkillsLocator(page);
    this.check = new TechSkillsChecker(page);
  }

  async addSkill(skill: TechSkill) {
    await this.check.submitButtonIsDisabled();
    await this.setSkill(skill.name);
    await this.check.submitButtonIsDisabled();
    await this.setLevel(skill.level);
    await this.check.submitButtonIsDisabled();
    await this.locate.experience.fill(`${skill.experience}`);
    await this.check.submitButtonIsEnabled();
    if (skill.hasCertification) await this.locate.hasCertification.check();
    if (skill.canTeach) await this.locate.canTeach.check();
    await this.locate.submitButton.click();
  }

  async modifySkill(skill: TechSkill, fieldsToChange: TechSkillMod) {
    await this.locate.modifyButton(skill).click();
    if (fieldsToChange.level) await this.setLevel(fieldsToChange.level);
    if (fieldsToChange.experience) await this.setExperience(fieldsToChange.experience);
    if (fieldsToChange.hasCertification) await this.locate.hasCertification.check();
    else if (fieldsToChange.hasCertification === false)
      await this.locate.hasCertification.uncheck();

    if (fieldsToChange.canTeach) await this.locate.canTeach.check();
    else if (fieldsToChange.canTeach === false) await this.locate.canTeach.uncheck();

    await this.locate.updateButton.click();
  }

  async setSkill(skillName: string) {
    await this.locate.skill.click();
    await this.locate.skill.type(skillName);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async setLevel(level: string) {
    await this.locate.level.click();
    await this.locate.levelOption(level).click();
  }

  async setExperience(amount: number) {
    await this.locate.experience.fill(`${amount}`);
  }

  async deleteSkill(skill: TechSkill, confirm: boolean) {
    await this.locate.deleteButton(skill).click();
    if (confirm) await this.locate.deletionConfirmButton.click();
    else await this.locate.deletionCancelButton.click();
  }
}
