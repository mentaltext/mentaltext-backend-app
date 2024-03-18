import { TSaveRetainedMessages } from "../../domain/IRetainedMessagesApplicationImplementations";

  export const SaveRetainedMessages: TSaveRetainedMessages = (repository) => async (RetainedMessages) => {
      return await repository.save(RetainedMessages);
  };

  