import { TSaveChatParticipants } from "../../domain/IChatParticipantsApplicationImplementations";

  export const SaveChatParticipants: TSaveChatParticipants = (repository) => async (ChatParticipants) => {
      return await repository.save(ChatParticipants);
  };

  