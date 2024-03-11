import { PrismaUserProfileRepository } from "@/core/UserProfile/infraestructure/repositorys/PrismaUserProfileRepository";
import { SaveUserProfile } from "../../application/repositoryImplementations/SaveUserProfile";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

const repository = PrismaUserProfileRepository(PrismaProvider);

export const UserProfileRespositorysContainer = {
  saveUserProfileImp: SaveUserProfile(repository)
};
