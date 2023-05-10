import { Page, Locator } from "@playwright/test";

export class HeaderLocator {
  readonly logo: Locator;
  readonly home: Locator;
  readonly skills: Locator;
  readonly collabs: Locator;
  readonly about: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    this.logo = page.locator("#Capa_1");
    this.home = page.getByRole("link", { name: "home" });
    this.skills = page.getByRole("link", { name: "your skills and experience", exact: true });
    this.collabs = page.getByRole("link", { name: "find collaborators" });
    this.about = page.getByRole("link", { name: "about" });
    this.logout = page.getByRole("link", { name: "Log out" });
  }
}
