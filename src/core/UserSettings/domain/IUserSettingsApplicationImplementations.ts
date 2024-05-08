import { Filter } from "@/shared/Types/IFilter";
import { IUserSettingsBase } from "./IUserSettingsSettingsProfile";
import { IUserSettingsRepository } from "./IUserSettingsRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveUserSettings =(user: IUserSettingsBase) => Promise<IUserSettingsBase>
export type TSaveUserSettings = (userRepository: IUserSettingsRepository) => SaveUserSettings;

export type FindUserSettings = (criteria: Filter<IUserSettingsBase>[]) => Promise<Nullable<IUserSettingsBase>>
export type TFindUserSettings = (userRepository: IUserSettingsRepository) => FindUserSettings;

export type UpdateUserSettings = (user: IUserSettingsBase) => Promise<IUserSettingsBase>
export type TUpdateUserSettings = (userRepository: IUserSettingsRepository) => UpdateUserSettings;
