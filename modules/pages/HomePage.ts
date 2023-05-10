import { Page } from "@playwright/test";
import { HomeLocator } from "../locators/HomeLocator";
import { HomeChecker } from "../checkers/HomeChecker";
import { HeaderPage } from "./HeaderPage";
import { LoginPage } from "./LoginPage";

export class HomePage {
  readonly page: Page;
  readonly locate: HomeLocator;
  readonly check: HomeChecker;
  readonly header: HeaderPage;

  constructor(page: Page) {
    this.page = page;
    this.locate = new HomeLocator(page);
    this.check = new HomeChecker(page);
    this.header = new HeaderPage(page);
  }

  async navigate() {
    await this.page.goto("/home");
  }

  async logout() {
    await this.locate.logout.click();
    return new LoginPage(this.page);
  }
}
