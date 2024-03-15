//  && rimraf ./dist/lib/cli-genetator-files/templates && shx mkdir -p ./dist/lib/cli-genetator-files/templates && shx cp -r ./src/lib/cli-genetator-files/templates/* ./dist/lib/cli-genetator-files/templates/
import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import { createModuleStructure } from "./utils.js";


// Pregunta al usuario
const questions = [
  {
    type: "input",
    name: "newModuleName",
    message: "¿Cómo se va a llamar el módulo?",
  },
  {
    type: "input",
    name: "pk",
    message: "¿Cómo se llama la llave primaria?",
  },
];
inquirer.prompt(questions).then((answers) => {
  const { newModuleName, pk } = answers;
  createModuleStructure(fs, path, newModuleName, pk);


});
