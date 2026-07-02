import { input } from "./input.js";

export const confirm = async (message) => {
  const answer = await input(`${message} (Y/n)`);

  return answer.toLowerCase() !== "n";
};
