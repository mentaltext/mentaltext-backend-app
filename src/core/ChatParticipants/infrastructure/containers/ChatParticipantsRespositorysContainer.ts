import { PrismaChatParticipantsRepository } from "./../../../../core/ChatParticipants/infrastructure/repositorys/PrismaChatParticipantsRepository";
import { SaveChatParticipants } from "../../application/repositoryImplementations/SaveChatParticipants";
import { PrismaProvider } from "./../../../../main/providers/PrismaProvider";
import { FindChatParticipants } from "../../application/repositoryImplementations/FindChatParticipants";

const repository = PrismaChatParticipantsRepository(PrismaProvider);

export const ChatParticipantsRespositorysContainer = {
  saveChatParticipantsImp: SaveChatParticipants(repository),
  findChatParticipantsImp: FindChatParticipants(repository),
};
