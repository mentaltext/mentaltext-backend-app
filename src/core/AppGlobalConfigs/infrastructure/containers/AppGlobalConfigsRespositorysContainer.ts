import { PrismaAppGlobalConfigsRepository } from "../repositorys/PrismaAppGlobalConfigsRepository";
import { PrismaProvider } from "../../../../main/providers/PrismaProvider";
import { FindAppGlobalConfigs } from "../../application/repositoryImplementations/FindAppGlobalConfigs";

const repository = PrismaAppGlobalConfigsRepository(PrismaProvider);

export const AppGlobalConfigsRespositorysContainer = {
  findAppGlobalConfigs: FindAppGlobalConfigs(repository)
};
