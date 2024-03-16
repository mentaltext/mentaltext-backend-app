import { TSaveChatSettings } from "../../domain/IChatSettingsApplicationImplementations";

  export const SaveChatSettings: TSaveChatSettings = (repository) => async (ChatSettings) => {
      return await repository.save(ChatSettings);
  };

