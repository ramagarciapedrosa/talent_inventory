import { Page, expect } from "@playwright/test";
import { Industry, IndustryMod } from "../pages/IndustriesPage";
import { parseIndustryFields } from "../../utils/skillsParser";
import { IndustriesLocator } from "../locators/IndustriesLocator";

export class IndustriesChecker {
  readonly page: Page;
  readonly locate: IndustriesLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new IndustriesLocator(page);
  }

  async locatorsAreVisible() {
    await expect(this.locate.industry).toBeVisible();
    await expect(this.locate.experience).toBeVisible();
    await expect(this.locate.submitButton).toBeVisible();
  }

  async submitButtonIsDisabled() {
    await expect(this.locate.submitButton).toBeDisabled();
  }

  async submitButtonIsEnabled() {
    await expect(this.locate.submitButton).toBeEnabled();
  }

  async industryAdditionToast() {
    await expect(this.locate.industryAdditionToast).toBeVisible();
  }

  async industryDeletionToast() {
    await expect(this.locate.industryDeletionToast).toBeVisible();
  }

  async industryOnTable(industry: Industry) {
    const locatorText = parseIndustryFields(industry);
    await expect(this.page.getByText(locatorText)).toBeVisible();
  }

  async industryNotOnTable(industry: Industry) {
    const locatorText = parseIndustryFields(industry);
    await expect(this.page.getByText(locatorText)).not.toBeVisible();
  }

  async industryModification(industry: Industry, modification: IndustryMod) {
    if (modification.experience) industry.experience = modification.experience;
    const locatorText = parseIndustryFields(industry);
    await expect(this.page.getByText(locatorText)).toBeVisible();
  }

  async xpUnderLimitMessage() {
    await expect(this.locate.underLimitMessage).toBeVisible();
  }

  async xpAboveLimitMessage() {
    await expect(this.locate.aboveLimitMessage).toBeVisible();
  }
}
