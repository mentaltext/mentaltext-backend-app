import { TSaveMessage } from "../../domain/IMessageApplicationImplementations";

  export const SaveMessage: TSaveMessage = (repository) => async (Message) => {
      return await repository.save(Message);
  };

