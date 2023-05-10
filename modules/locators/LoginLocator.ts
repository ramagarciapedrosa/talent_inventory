import { Page, Locator } from "@playwright/test";

export class LoginLocator {
  readonly page: Page;

  readonly googleButton: Locator;

  // Google login
  readonly email: Locator;
  readonly password: Locator;
  readonly emailNext: Locator;
  readonly passwordNext: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.googleButton = page.getByRole("button", {
      name: "Acceder con Google",
    });
    this.email = page.getByLabel("Email or phone");
    this.password = page.getByLabel("Enter your password");
    this.emailNext = page.locator("#identifierNext");
    this.passwordNext = page.locator("#passwordNext");
    this.confirmButton = page.getByRole("button", { name: "Confirmar" });
    this.cancelButton = page.getByRole("button", { name: "Cancelar" });
  }
}
