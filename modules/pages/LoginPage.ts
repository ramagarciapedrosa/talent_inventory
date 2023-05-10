import { Page } from "@playwright/test";
import { LoginChecker } from "../checkers/LoginChecker";
import { LoginLocator } from "../locators/LoginLocator";
import { HomePage } from "./HomePage";
import { HeaderPage } from "./HeaderPage";

export class LoginPage {
  readonly page: Page;
  readonly check: LoginChecker;
  readonly locate: LoginLocator;
  readonly header: HeaderPage;

  constructor(page: Page) {
    this.page = page;
    this.check = new LoginChecker(page);
    this.locate = new LoginLocator(page);
    this.header = new HeaderPage(page);
  }

  async navigate() {
    await this.page.goto("/");
  }

  async login(email: string, password: string) {
    await this.fillLogin(email, password);
    await this.page.waitForURL("**/home");
    return new HomePage(this.page);
  }

  async invalidLogin(email: string, password: string, confirm: boolean) {
    const googleLogin = await this.fillLogin(email, password);
    if (confirm) await googleLogin.confirmButton.click();
    else await googleLogin.cancelButton.click();
  }

  async fillLogin(email: string, password: string) {
    const [googlePage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.locate.googleButton.click(),
    ]);
    const googleLogin = new LoginLocator(googlePage);
    await googleLogin.email.fill(email);
    await googleLogin.emailNext.click();
    await googleLogin.password.fill(password);
    await googleLogin.passwordNext.click();
    return googleLogin;
  }
}
