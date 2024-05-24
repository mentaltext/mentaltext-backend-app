import { Filter } from "@/shared/Types/IFilter";
import { IAppGlobalConfigsBase } from "./IAppGlobalConfigs";
import { IAppGlobalConfigsRepository } from "./IAppGlobalConfigsRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveAppGlobalConfigs = (
  user: IAppGlobalConfigsBase
) => Promise<IAppGlobalConfigsBase>;
export type TSaveAppGlobalConfigs = (
  userRepository: IAppGlobalConfigsRepository
) => SaveAppGlobalConfigs;

export type FindAppGlobalConfigs = (
  criteria: Filter<IAppGlobalConfigsBase>[]
) => Promise<Nullable<IAppGlobalConfigsBase>>;
export type TFindAppGlobalConfigs = (
  userRepository: IAppGlobalConfigsRepository
) => FindAppGlobalConfigs;

export type UpdateAppGlobalConfigs = (
  user: IAppGlobalConfigsBase
) => Promise<IAppGlobalConfigsBase>;
export type TUpdateAppGlobalConfigs = (
  userRepository: IAppGlobalConfigsRepository
) => UpdateAppGlobalConfigs;
