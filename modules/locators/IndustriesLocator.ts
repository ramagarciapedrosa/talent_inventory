import { Locator, Page } from "@playwright/test";
import { parseIndustryFields } from "../../utils/skillsParser";
import { Industry } from "../pages/IndustriesPage";
import { SkillsSectionLocator } from "./SkillsSectionLocator";

export class IndustriesLocator extends SkillsSectionLocator {
  readonly page: Page;

  // Form elements
  readonly industry: Locator;

  // Toast messages
  readonly industryAdditionToast: Locator;
  readonly industryDeletionToast: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.industry = page.locator("#industry");
    this.industryAdditionToast = page.locator(
      "div[role='alert']:has-text('The industry was added and saved successfully')"
    );
    this.industryDeletionToast = page.locator(
      "div[role='alert']:has-text('The industry was removed successfully')"
    );
  }

  modifyButton(industry: Industry) {
    const locatorText = parseIndustryFields(industry);
    return this.page.getByText(locatorText).locator("svg").first();
  }

  deleteButton(industry: Industry) {
    const locatorText = parseIndustryFields(industry);
    return this.page.getByText(locatorText).locator("svg").last();
  }
}
