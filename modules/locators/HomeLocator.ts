import { Locator, Page } from "@playwright/test";

export class HomeLocator {
  readonly page: Page;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly infoText: Locator;
  readonly addSkills: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1");
    this.subtitle = page.getByRole("heading", {
      name: "You are part of our awesome team and we know you have awesome talents.",
    });
    this.infoText = page.getByRole("heading", {
      name: "That's why we want to know more about you!",
    });
    this.addSkills = page.getByRole("link", { name: "Add your skills and experience" });
    this.logout = page.getByRole("link", { name: "Log out" });
  }
}
