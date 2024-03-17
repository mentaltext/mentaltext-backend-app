import { PrismaChatSettingsRepository } from "@/core/ChatSettings/infrastructure/repositorys/PrismaChatSettingsRepository";
import { SaveChatSettings } from "../../application/repositoryImplementations/SaveChatSettings";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

const repository = PrismaChatSettingsRepository(PrismaProvider);

export const ChatSettingsRespositorysContainer = {
  saveChatSettingsImp: SaveChatSettings(repository),
};
