import { Page, expect } from "@playwright/test";

export class LoginChecker {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async url() {
    await expect(this.page).toHaveURL("/");
  }
}
