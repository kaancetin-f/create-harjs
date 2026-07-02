import { input } from "./helpers/input.js";
import { select } from "./helpers/select.js";
import { confirm } from "./helpers/confirm.js";
import { options } from "./constant/options.js";

export const askQuestions = async () => {
  const name = await input("Project name:");
  console.log("-----");

  const template = await select("Choose a project template:", [...Object.keys(options)]);
  console.log("-----");

  const ui = await confirm("? Would you like to install HarJS Design?");
  console.log("-----");

  const service = await confirm("? Would you like to install HarJS Design Service (fetch utilities)?");
  console.log("-----");

  const translation = await confirm("? Would you like to install HarJS Design Translation Service?");
  console.log("-----");

  console.warn("Starting the installation...");

  return { name, template, ui, service };
};
