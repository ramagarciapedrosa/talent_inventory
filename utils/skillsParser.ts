import { Industry } from "../modules/pages/IndustriesPage";
import { TechSkill } from "../modules/pages/TechSkillsPage";
import { Tool } from "../modules/pages/ToolsPage";

export function parseTechSkillFields(skill: TechSkill) {
  const certification = skill.hasCertification ? "Yes" : "No";
  const teach = skill.canTeach ? "Yes" : "No";
  switch (skill.level) {
    case "Basic":
      skill.level = 1 + skill.level;
      break;
    case "Beginner":
      skill.level = 2 + skill.level;
      break;
    case "Intermediate":
      skill.level = 3 + skill.level;
      break;
    case "Advanced":
      skill.level = 4 + skill.level;
      break;
    case "Expert":
      skill.level = 5 + skill.level;
      break;
    default:
      break;
  }
  return `${skill.name}${skill.level}${skill.experience}${certification}${teach}`;
}

export function parseToolFields(tool: Tool) {
  const teach = tool.canTeach ? "Yes" : "No";
  switch (tool.level) {
    case "Basic":
      tool.level = 1 + tool.level;
      break;
    case "Beginner":
      tool.level = 2 + tool.level;
      break;
    case "Intermediate":
      tool.level = 3 + tool.level;
      break;
    case "Advanced":
      tool.level = 4 + tool.level;
      break;
    case "Expert":
      tool.level = 5 + tool.level;
      break;
    default:
      break;
  }
  return `${tool.name}${tool.level}${tool.experience}${teach}`;
}

export function parseIndustryFields(industry: Industry) {
  return `${industry.name}${industry.experience}`;
}
