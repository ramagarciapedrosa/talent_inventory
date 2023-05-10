import { Page, expect } from "@playwright/test";
import { HeaderLocator } from "../locators/HeaderLocator";

export class HeaderChecker {
  readonly page: Page;
  readonly locate: HeaderLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new HeaderLocator(page);
  }

  async locatorsAreVisible() {
    await expect(this.locate.logo).toBeVisible();
    await expect(this.locate.home).toBeVisible();
    await expect(this.locate.skills).toBeVisible();
    // await expect(this.locate.collabs).toBeVisible();
    await expect(this.locate.about).toBeVisible();
    await expect(this.locate.logout).toBeVisible();
  }
}
