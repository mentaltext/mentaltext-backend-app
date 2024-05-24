import { TFindAppGlobalConfigs } from "../../domain/IAppGlobalConfigsApplicationImplementations";

export const FindAppGlobalConfigs: TFindAppGlobalConfigs = (repository) => async (request) => {
  return repository.find(request);
};
