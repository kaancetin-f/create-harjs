#!/usr/bin/env node

import { askQuestions } from "./libs/prompt.js";
import createProject from "./libs/createProject.js";

const main = async () => {
  const answers = await askQuestions();

  console.log(answers);

  await createProject({ ...answers });

  console.log("\n🎉 Proje hazır.");
};

main();
