import { TSaveAppGlobalConfigs } from "../../domain/IAppGlobalConfigsApplicationImplementations";

export const SaveAppGlobalConfigs: TSaveAppGlobalConfigs =
  (repository) => async (AppGlobalConfigs) => {
    return await repository.save(AppGlobalConfigs);
  };
