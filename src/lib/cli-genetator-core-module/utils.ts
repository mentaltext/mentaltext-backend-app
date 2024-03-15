export const createModuleStructure = (fs, path, newModuleName, pk) => {
  const filePath = path.join(__dirname, "../../../src/core");

  // create folder newModuleName/application/UseCases, newModuleName/domain y newModuleName/infrastructure
  fs.mkdirSync(`${filePath}/${newModuleName}`, { recursive: true });
  fs.mkdirSync(`${filePath}/${newModuleName}/application`, { recursive: true });
  fs.mkdirSync(
    `${filePath}/${newModuleName}/application/repositoryImplementations`,
    { recursive: true }
  );
  fs.mkdirSync(`${filePath}/${newModuleName}/application/UseCases`, {
    recursive: true,
  });

  fs.mkdirSync(`${filePath}/${newModuleName}/domain`, { recursive: true });
  createInterfaceBase(fs, path, newModuleName);
  createDomaiRepository(fs, path, newModuleName);

  fs.mkdirSync(`${filePath}/${newModuleName}/infrastructure`, {
    recursive: true,
  });
  fs.mkdirSync(`${filePath}/${newModuleName}/infrastructure/containers`, {
    recursive: true,
  });

  fs.mkdirSync(`${filePath}/${newModuleName}/infrastructure/repositorys`, {
    recursive: true,
  });
  createRepository(fs, path, newModuleName, pk);

  fs.mkdirSync(`${filePath}/${newModuleName}/infrastructure/DTOs`, {
    recursive: true,
  });
};

const createRepository = (fs, path, newModuleName, pk) => {
  const modulePath = path.join(
    __dirname,
    "../../../src/core",
    newModuleName,
    "infrastructure",
    "repositorys"
  );

  const fileName = `Prisma${newModuleName}Repository.ts`;
  const filePath = path.join(modulePath, fileName);

  const moduleNameWithFirstLetterLowerCase =
    newModuleName.charAt(0).toLowerCase() + newModuleName.slice(1);

  const fileContent = `import { PrismaClient } from "@prisma/client";
  import { I${newModuleName}Repository } from "@/core/${newModuleName}/domain/I${newModuleName}Repository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { I${newModuleName}Base } from "../../domain/I${newModuleName}";

  export const Prisma${newModuleName}Repository = (
    client: PrismaClient
  ): I${newModuleName}Repository => ({
    async save(user) {
      const nUser = await client.${moduleNameWithFirstLetterLowerCase}.upsert({
        where: {
          ${pk}: user.${pk},
        },
        update: {
          ...user,
        },
        create: {
          ...user,
        },
      });

      return nUser;
    },
    async find(criteria) {
      if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
        throw new Error("Invalid input: criteria must be an array of Filters");
      }
      const ${newModuleName} = await client.${moduleNameWithFirstLetterLowerCase}.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!${newModuleName}) {
        return null;
      }
      return ${newModuleName};
    },
  });


const isFilter = (obj: Filter<I${newModuleName}Base>): obj is Filter<I${newModuleName}Base> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<I${newModuleName}Base>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

  `;

  fs.writeFileSync(filePath, fileContent);

  console.log(`[+] Archivo ${fileName} creado en ${modulePath}`);
};

const createDomaiRepository = (fs, path, newModuleName) => {
  const modulePath = path.join(
    __dirname,
    "../../../src/core",
    newModuleName,
    "domain"
  );

  const fileName = `I${newModuleName}Repository.ts`;
  const filePath = path.join(modulePath, fileName);

  const fileContent = `import { GetResult } from "@prisma/client/runtime";
  import { I${newModuleName}Base } from "./I${newModuleName}";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface I${newModuleName}Repository {
      save(user: I${newModuleName}Base): Promise<GetResult<I${newModuleName}Base, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<I${newModuleName}Base>[]): Promise<Nullable<I${newModuleName}Base>>;
  }
  `;

  fs.writeFileSync(filePath, fileContent);

  console.log(`[+] Archivo ${fileName} creado en ${modulePath}`);
};

const createInterfaceBase = (fs, path, newModuleName) => {
  const modulePath = path.join(
    __dirname,
    "../../../src/core",
    newModuleName,
    "domain"
  );

  const fileName = `I${newModuleName}.ts`;
  const filePath = path.join(modulePath, fileName);

  const fileContent = `import { ${newModuleName} } from "@prisma/client";

  export type I${newModuleName}Base = ${newModuleName};

  `;

  fs.writeFileSync(filePath, fileContent);

  console.log(`[+] Archivo ${fileName} creado en ${modulePath}`);
};
