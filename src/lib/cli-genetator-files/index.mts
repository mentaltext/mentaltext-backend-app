//  && rimraf ./dist/lib/cli-genetator-files/templates && shx mkdir -p ./dist/lib/cli-genetator-files/templates && shx cp -r ./src/lib/cli-genetator-files/templates/* ./dist/lib/cli-genetator-files/templates/
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import inquirer from "inquirer";
import { createUseCase, modifyIUserApplicationUserCases, modifyIUserBodyRequest } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = `${__dirname}/../../../src/core`;

// Lista las carpetas disponibles
const listedModules = fs.readdirSync(modulesDir);

// Pregunta al usuario
const questions = [
  {
    type: "list",
    name: "moduleToGenerate",
    message: "¿En que modulo quisieras generar?",
    choices: listedModules,
  },
  {
    type: "input",
    name: "newModuleName",
    message: "¿Cómo se va a llamar el módulo?",
  },
];
inquirer.prompt(questions).then((answers) => {
  const { moduleToGenerate, newModuleName } = answers;
  const { typeUserCaseModuleName, typeReqBodyModuleName } = modifyIUserApplicationUserCases(fs, path, moduleToGenerate, newModuleName);
  modifyIUserBodyRequest(fs, path, moduleToGenerate, typeReqBodyModuleName);
  createUseCase(fs, path, modulesDir, moduleToGenerate, newModuleName, typeUserCaseModuleName);
});
