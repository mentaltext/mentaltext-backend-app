import { PrismaUserSettingsRepository } from "@/core/UserSettings/infraestructure/repositorys/PrismaUserSettingsRepository";
import { SaveUserSettings } from "../../application/repositoryImplementations/SaveUserSettings";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

const repository = PrismaUserSettingsRepository(PrismaProvider);

export const UserSettingsRespositorysContainer = {
  saveUserSettingsImp: SaveUserSettings(repository)
};
