import { Filter } from "@/shared/Types/IFilter";
  import { IMessageBase } from "./IMessage";
  import { IMessageRepository } from "./IMessageRepository";
  import { Nullable } from "@/shared/Types/TNullable";

  export type SaveMessage =(user: IMessageBase) => Promise<IMessageBase>
  export type TSaveMessage = (userRepository: IMessageRepository) => SaveMessage;

  export type FindMessage = (criteria: Filter<IMessageBase>[]) => Promise<Nullable<IMessageBase>>
  export type TFindMessage = (userRepository: IMessageRepository) => FindMessage;

  export type UpdateMessage = (user: IMessageBase) => Promise<IMessageBase>
  export type TUpdateMessage = (userRepository: IMessageRepository) => UpdateMessage;
