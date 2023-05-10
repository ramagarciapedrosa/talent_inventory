function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomLevel() {
  const levels = ["Basic", "Beginner", "Intermediate", "Advanced", "Expert"];
  const randomNumber = getRandomInt(0, levels.length);
  return levels[randomNumber];
}

export function getRandomExperience() {
  return getRandomInt(1, 99);
}

export function getRandomBoolean() {
  const rand = getRandomInt(0, 1);
  return rand === 0 ? false : true;
}
