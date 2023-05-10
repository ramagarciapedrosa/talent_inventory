import { Browser } from "@playwright/test";
import { LoginPage } from "../modules/pages/LoginPage";

export type StorageState = {
  cookies: {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "Strict" | "Lax" | "None";
  }[];
  origins: {
    origin: string;
    localStorage: {
      name: string;
      value: string;
    }[];
  }[];
};

export class LoginAPI {
  readonly browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  async getStorageState(mail: string, password: string): Promise<StorageState> {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(mail, password);
    const storageState = await context.storageState();
    await context.close();
    return storageState;
  }

  async getCredentials(storageState: StorageState): Promise<string> {
    return storageState.origins[0].localStorage[0].value;
  }
}
