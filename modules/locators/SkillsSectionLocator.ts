import { Locator, Page } from "@playwright/test";

export class SkillsSectionLocator {
  readonly page: Page;

  // Sections
  readonly techSkillsSection: Locator;
  readonly toolsSection: Locator;
  readonly industriesSection: Locator;

  // Skills list
  readonly skillsList: Locator;

  // Experience value limit messages
  readonly underLimitMessage: Locator;
  readonly aboveLimitMessage: Locator;

  // Form elements
  readonly experience: Locator;
  readonly submitButton: Locator;
  readonly updateButton: Locator;

  // Confirmation buttons
  readonly deletionConfirmButton: Locator;
  readonly deletionCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.techSkillsSection = page.getByText("Manage your technical skills");
    this.toolsSection = page.getByText("Manage your tools experience");
    this.industriesSection = page.getByText("Manage your industries experience");

    this.skillsList = page.locator(".scrollbar");

    this.underLimitMessage = page.getByText("Number must be greater than or equal to 0.5");
    this.aboveLimitMessage = page.getByText("Number must be less than or equal to 99");

    this.experience = page.locator("#yearsExperience");
    this.submitButton = page.getByRole("button", { name: "Add" });
    this.updateButton = page.getByRole("button", { name: "Update" });

    this.deletionConfirmButton = page.getByRole("button", { name: "Yes, delete" });
    this.deletionCancelButton = page.getByRole("button", { name: "No, cancel" });
  }
}
