import { Page } from "@playwright/test";
import { HeaderLocator } from "../locators/HeaderLocator";
import { HeaderChecker } from "../checkers/HeaderChecker";
import { SkillsSectionPage } from "./SkillsSectionPage";
import { HomePage } from "./HomePage";

export class HeaderPage {
  page: Page;
  locate: HeaderLocator;
  check: HeaderChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new HeaderLocator(page);
    this.check = new HeaderChecker(page);
  }

  async navigateToHome() {
    await this.locate.home.click();
    return new HomePage(this.page);
  }

  async navigateToSkills() {
    await this.locate.skills.click();
    return new SkillsSectionPage(this.page);
  }
}
