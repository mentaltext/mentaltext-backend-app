import { PrismaChatRepository } from "@/core/Chat/infrastructure/repositorys/PrismaChatRepository";
import { SaveChat } from "../../application/repositoryImplementations/SaveChat";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

const repository = PrismaChatRepository(PrismaProvider);

export const ChatRespositorysContainer = {
  saveChatImp: SaveChat(repository),
};
