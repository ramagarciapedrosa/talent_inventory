import { Page, expect } from "@playwright/test";
import { HomeLocator } from "../locators/HomeLocator";

export class HomeChecker {
  readonly page: Page;
  readonly locate: HomeLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new HomeLocator(page);
  }

  async url() {
    await expect(this.page).toHaveURL("https://dev.talent-inventory.ms-innovation.link/home");
  }

  async locatorsAreVisible() {
    await expect(this.locate.title).toBeVisible();
    await expect(this.locate.subtitle).toBeVisible();
    await expect(this.locate.infoText).toBeVisible();
    await expect(this.locate.addSkills).toBeVisible();
  }
}
