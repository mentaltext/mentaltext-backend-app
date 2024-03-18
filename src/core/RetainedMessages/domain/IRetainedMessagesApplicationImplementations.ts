import { Filter } from "@/shared/Types/IFilter";
  import { IRetainedMessagesBase } from "./IRetainedMessages";
  import { IRetainedMessagesRepository } from "./IRetainedMessagesRepository";
  import { Nullable } from "@/shared/Types/TNullable";

  export type SaveRetainedMessages =(user: IRetainedMessagesBase) => Promise<IRetainedMessagesBase>
  export type TSaveRetainedMessages = (userRepository: IRetainedMessagesRepository) => SaveRetainedMessages;

  export type FindRetainedMessages = (criteria: Filter<IRetainedMessagesBase>[]) => Promise<Nullable<IRetainedMessagesBase>>
  export type TFindRetainedMessages = (userRepository: IRetainedMessagesRepository) => FindRetainedMessages;

  export type UpdateRetainedMessages = (user: IRetainedMessagesBase) => Promise<IRetainedMessagesBase>
  export type TUpdateRetainedMessages = (userRepository: IRetainedMessagesRepository) => UpdateRetainedMessages;
  