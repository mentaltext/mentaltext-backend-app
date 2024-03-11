import { TSaveUserProfile } from "../../domain/IUserProfileApplicationImplementations";

export const SaveUserProfile: TSaveUserProfile = (repository) => async (user) => {
    return await repository.save(user);
};
