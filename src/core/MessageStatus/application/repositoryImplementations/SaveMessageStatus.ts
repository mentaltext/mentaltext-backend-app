import { TSaveMessageStatus } from "../../domain/IMessageStatusApplicationImplementations";

  export const SaveMessageStatus: TSaveMessageStatus = (repository) => async (MessageStatus) => {
      return await repository.save(MessageStatus);
  };

  