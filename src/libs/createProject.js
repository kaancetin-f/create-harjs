import fs from "node:fs";
import path from "node:path";
import { execSync, spawn } from "node:child_process";
import { options } from "./constant/options.js";

const createProject = async ({ name, template, ui, service, translation }) => {
  console.log(name, "dadwadwdwa");

  const projectPath = path.join(process.cwd(), name);

  // Klasör zaten var mı?
  if (fs.existsSync(projectPath)) {
    console.log("A folder with that name already exists.");
    process.exit(1);
  }

  fs.mkdirSync(projectPath);

  switch (template) {
    case options["Next.js"]:
      console.warn("Starting the Next.js installation wizard...");
      execSync(`npx create-next-app@latest ${name}`, { stdio: "inherit" });
      break;

    default:
      break;
  }

  if (ui) execSync("npm i @harjs/react-ui", { cwd: projectPath, stdio: "inherit" });
  if (service) execSync("npm i @harjs/service", { cwd: projectPath, stdio: "inherit" });
  if (translation) execSync("npm i @harjs/translation", { cwd: projectPath, stdio: "inherit" });

  // fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(packageJson, null, 2));

  // README.md
  // fs.writeFileSync(path.join(projectPath, "README.md"), `# ${name}\n\nTemplate: ${template}\n`);

  console.log(`\n${name} oluşturuldu.`);
};

export default createProject;
