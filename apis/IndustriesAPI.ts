import { expect, request } from "@playwright/test";
import { getRandomExperience } from "../utils/getRandoms";
import { Industry, IndustryMod } from "../modules/pages/IndustriesPage";

type IndustriesList = {
  id: string;
  name: string;
}[];

type UserIndustries = {
  industry_id: string;
  industry_name: string;
  years_of_experience: number;
}[];

export class IndustriesAPI {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async getAll() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/industries",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: IndustriesList = await response.json();
    const industriesNames: string[] = [];
    processedResponse.forEach((industry) => {
      industriesNames.push(industry.name);
    });
    return industriesNames;
  }

  private async getUserList() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/user-industries",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: UserIndustries = await response.json();
    const userIndustriesNames: string[] = [];
    processedResponse.forEach((industry) => {
      userIndustriesNames.push(industry.industry_name);
    });
    return userIndustriesNames;
  }

  async getRandom(): Promise<Industry> {
    const industriesList = await this.getAll();
    const userList = await this.getUserList();
    let randomNumber = Math.floor(Math.random() * industriesList.length);
    while (userList.includes(industriesList[randomNumber]))
      randomNumber = Math.floor(Math.random() * industriesList.length);
    return {
      name: industriesList[randomNumber],
      experience: getRandomExperience(),
    };
  }

  async getRandomMods(): Promise<IndustryMod> {
    return {
      experience: getRandomExperience(),
    };
  }
}
