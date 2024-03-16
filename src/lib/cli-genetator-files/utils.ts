export const createUseCase = (
  fs,
  path,
  modulesDir,
  moduleToGenerate,
  newModuleName,
  typeUserCaseModuleName
) => {
  const modulePath = path.join(
    modulesDir,
    moduleToGenerate,
    "application",
    "UseCases"
  );
  const fileName = `${moduleToGenerate}${newModuleName}.ts`;
  const filePath = path.join(modulePath, fileName);

  // Asegurarse de que el directorio existe
  fs.mkdirSync(modulePath, { recursive: true });

  // Contenido del archivo
  const fileContent = `import { ${typeUserCaseModuleName} } from "../../domain/I${moduleToGenerate}ApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const ${moduleToGenerate}${newModuleName}: ${typeUserCaseModuleName} = (ResponseLogger) => async (req) => {
  try {
    const {} = req.body;
    return ResponseLogger(StatusCodes.OK, "", {});
  } catch (error) {
    if (error instanceof Error) {
      return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};
`;
  fs.writeFileSync(filePath, fileContent);

  console.log(`[+] Archivo ${fileName} creado en ${modulePath}`);
};

export const modifyIUserApplicationUserCases = (
  fs,
  path,
  moduleToGenerate,
  newModuleName
) => {
  const filePath = path.join(
    __dirname,
    "../../../src/core",
    moduleToGenerate,
    "domain",
    `I${moduleToGenerate}ApplicationUserCases.ts`
  );

  const typeReqBodyModuleName = `T${moduleToGenerate}${newModuleName}ReqBody`;
  const typeUserCaseModuleName = `T${moduleToGenerate}${newModuleName}UserCase`;


  // Lee el contenido actual del archivo
  let fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

  // Encuentra la línea de importación y la modifica
  const importSearchPattern = /import { (.*) } from "\.\/UserBodyRequest";/;

  // Verifica si la línea de importación ya existe y la modifica, o agrega una nueva línea de importación
  if (importSearchPattern.test(fileContent)) {
    fileContent = fileContent.replace(importSearchPattern, (match, p1) => {
      // Asegura no duplicar la importación si ya existe
      if (!p1.includes(`T${moduleToGenerate}${newModuleName}ReqBody`)) {
        return `import { ${p1}, T${moduleToGenerate}${newModuleName}ReqBody } from "./UserBodyRequest";`;
      }
      return match;
    });
  } else {
    // Si por alguna razón la línea de importación no está presente, la agrega al inicio del archivo
    fileContent =
      `import { T${moduleToGenerate}${newModuleName}ReqBody } from "./UserBodyRequest";\n` +
      fileContent;
  }

  // Agrega la nueva definición de tipo al final del contenido del archivo
  const newTypeDefinition = `export type T${moduleToGenerate}${newModuleName}UserCase = EndpointHandler<[], T${moduleToGenerate}${newModuleName}ReqBody>;`;
  fileContent += `${newTypeDefinition}\n`;

  // Escribe el contenido modificado de vuelta al archivo
  fs.writeFileSync(filePath, fileContent, { encoding: "utf-8" });

  console.log(
    `[+] Tipo ${newModuleName} agregado a IUserApplicationUserCases.ts`
  );

  return { typeReqBodyModuleName, typeUserCaseModuleName };
};

export const modifyIUserBodyRequest = (
  fs,
  path,
  moduleToGenerate,
  typeReqBodyModuleName
) => {
  const filePath = path.join(
    __dirname,
    "../../../src/core",
    moduleToGenerate,
    "domain",
    "UserBodyRequest.ts"
  );


  // Lee el contenido actual del archivo
  let fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

  // Agrega la nueva definición de tipo al final del contenido del archivo
  const newTypeDefinition = `export type ${typeReqBodyModuleName} = string;`;
  fileContent += `${newTypeDefinition}\n`;

  // Escribe el contenido modificado de vuelta al archivo
  fs.writeFileSync(filePath, fileContent, { encoding: "utf-8" });

  console.log(
    `[+] Tipo ${typeReqBodyModuleName} agregado a UserBodyRequest.ts`
  );
};
