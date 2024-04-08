import { PrismaUserRepository } from "./../../../../core/User/infraestructure/repositorys/PrismaUserRepository";
import { SaveUser } from "../../application/repositoryImplementations/SaveUser";
import { FindUser } from "../../application/repositoryImplementations/FindUser";
import { PrismaProvider } from "./../../../../main/providers/PrismaProvider";
import { UpdateUser } from "../../application/repositoryImplementations/UpdateUser";

const repository = PrismaUserRepository(PrismaProvider);

export const UserRespositorysContainer = {
  saveUserImp: SaveUser(repository),
  findUserImp: FindUser(repository),
  updateUserImp: UpdateUser(repository)
};
