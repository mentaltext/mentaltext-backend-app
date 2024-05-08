import { TSaveUserSettings } from "../../domain/IUserSettingsApplicationImplementations";

export const SaveUserSettings: TSaveUserSettings = (repository) => async (user) => {
    return await repository.save(user);
};
