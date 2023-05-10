import { expect, request } from "@playwright/test";
import { getRandomBoolean, getRandomExperience, getRandomLevel } from "../utils/getRandoms";
import { Tool, ToolMod } from "../modules/pages/ToolsPage";

type ToolsList = {
  id: string;
  name: string;
  tool_category: {
    id: string;
    name: string;
  };
}[];

type UserTools = {
  can_teach: boolean;
  level_id: string;
  level_name: string;
  tool_id: string;
  tool_name: string;
  years_of_experience: number;
}[];

export class ToolsAPI {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async getAll() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/tools",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: ToolsList = await response.json();
    const toolNames: string[] = [];
    processedResponse.forEach((tool) => {
      toolNames.push(tool.name);
    });
    return toolNames;
  }

  private async getUserList() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      "https://dev-api.talent-inventory.ms-innovation.link/api/user-tools",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `Bearer ${this.token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const processedResponse: UserTools = await response.json();
    const userToolNames: string[] = [];
    processedResponse.forEach((tool) => {
      userToolNames.push(tool.tool_name);
    });
    return userToolNames;
  }

  async getRandom(): Promise<Tool> {
    const toolsList = await this.getAll();
    const userList = await this.getUserList();
    let randomNumber = Math.floor(Math.random() * toolsList.length);
    while (userList.includes(toolsList[randomNumber]))
      randomNumber = Math.floor(Math.random() * toolsList.length);
    return {
      name: toolsList[randomNumber],
      level: getRandomLevel(),
      experience: getRandomExperience(),
      canTeach: getRandomBoolean(),
    };
  }

  async getRandomMods(): Promise<ToolMod> {
    return {
      level: getRandomLevel(),
      experience: getRandomExperience(),
      canTeach: getRandomBoolean(),
    };
  }
}
