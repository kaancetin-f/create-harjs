import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

export const input = async (message) => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const answer = await rl.question(message + " ");

  rl.close();
  return answer;
};
