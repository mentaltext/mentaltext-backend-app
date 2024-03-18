import { TFindChatParticipants } from "../../domain/IChatParticipantsApplicationImplementations";

export const FindChatParticipants: TFindChatParticipants = (repository) => async (request) => {
  return repository.find(request);
};
