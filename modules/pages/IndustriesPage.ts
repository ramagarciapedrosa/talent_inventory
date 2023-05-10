import { Page } from "@playwright/test";
import { IndustriesChecker } from "../checkers/IndustriesChecker";
import { IndustriesLocator } from "../locators/IndustriesLocator";

export type Industry = {
  name: string;
  experience: number;
};

export type IndustryMod = {
  experience: number;
};

export class IndustriesPage {
  readonly page: Page;
  readonly locate: IndustriesLocator;
  readonly check: IndustriesChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new IndustriesLocator(page);
    this.check = new IndustriesChecker(page);
  }

  async addIndustry(industry: Industry) {
    await this.check.submitButtonIsDisabled();
    await this.setIndustry(industry.name);
    await this.check.submitButtonIsDisabled();
    await this.setExperience(industry.experience);
    await this.check.submitButtonIsEnabled();
    await this.locate.submitButton.click();
  }

  async modifyIndustry(industry: Industry, fieldsToChange: IndustryMod) {
    await this.locate.modifyButton(industry).click();
    if (fieldsToChange.experience) await this.setExperience(fieldsToChange.experience);
    await this.locate.updateButton.click();
  }

  async deleteIndustry(industry: Industry, confirm: boolean) {
    await this.locate.deleteButton(industry).click();
    if (confirm) await this.locate.deletionConfirmButton.click();
    else await this.locate.deletionCancelButton.click();
  }

  private async setIndustry(industryName: string) {
    await this.locate.industry.click();
    await this.locate.industry.type(industryName);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async setExperience(experience: number) {
    await this.locate.experience.fill(`${experience}`);
  }
}
