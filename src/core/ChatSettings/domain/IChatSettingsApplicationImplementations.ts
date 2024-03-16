import { Filter } from "@/shared/Types/IFilter";
  import { IChatSettingsBase } from "./IChatSettings";
  import { IChatSettingsRepository } from "./IChatSettingsRepository";
  import { Nullable } from "@/shared/Types/TNullable";

  export type SaveChatSettings =(user: IChatSettingsBase) => Promise<IChatSettingsBase>
  export type TSaveChatSettings = (userRepository: IChatSettingsRepository) => SaveChatSettings;

  export type FindChatSettings = (criteria: Filter<IChatSettingsBase>[]) => Promise<Nullable<IChatSettingsBase>>
  export type TFindChatSettings = (userRepository: IChatSettingsRepository) => FindChatSettings;

  export type UpdateChatSettings = (user: IChatSettingsBase) => Promise<IChatSettingsBase>
  export type TUpdateChatSettings = (userRepository: IChatSettingsRepository) => UpdateChatSettings;
