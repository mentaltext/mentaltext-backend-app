import { TSaveChat } from "../../domain/IChatApplicationImplementations";

export const SaveChat: TSaveChat = (repository) => async (user) => {
    return await repository.save(user);
};
