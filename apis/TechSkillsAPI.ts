import { expect, request } from "@playwright/test";
import { TechSkill, TechSkillMod } from "../modules/pages/TechSkillsPage";
import { getRandomBoolean, getRandomExperience, getRandomLevel } from "../utils/getRandoms";

type TechSkillsList = {
  id: string;
  name: string;
  technical_skill_category: {
    id: string;
    name: string;
  };
}[];

type UserTechSkills = {
  can_teach: boolean;
  had_certification: boolean;
  level_id: string;
  level_name: string;
  technical_skill_id: string;
  technical_skill_name: string;
  years_of_experience: number;
}[];

export class TechSkillsAPI {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async getAll() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/technical-skills",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: TechSkillsList = await response.json();
    const techSkillNames: string[] = [];
    processedResponse.forEach((techSkill) => {
      techSkillNames.push(techSkill.name);
    });
    return techSkillNames;
  }

  async getUserList() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/user-technical-skills",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: UserTechSkills = await response.json();
    const userTechSkillNames: string[] = [];
    processedResponse.forEach((techSkill) => {
      userTechSkillNames.push(techSkill.technical_skill_name);
    });
    return userTechSkillNames;
  }

  async getRandom(): Promise<TechSkill> {
    const techSkillsList = await this.getAll();
    const userList = await this.getUserList();
    let randomNumber = Math.floor(Math.random() * techSkillsList.length);
    while (userList.includes(techSkillsList[randomNumber]))
      randomNumber = Math.floor(Math.random() * techSkillsList.length);
    return {
      name: techSkillsList[randomNumber],
      level: getRandomLevel(),
      experience: getRandomExperience(),
      hasCertification: getRandomBoolean(),
      canTeach: getRandomBoolean(),
    };
  }

  async getRandomMods(): Promise<TechSkillMod> {
    return {
      level: getRandomLevel(),
      experience: getRandomExperience(),
      hasCertification: getRandomBoolean(),
      canTeach: getRandomBoolean(),
    };
  }
}
