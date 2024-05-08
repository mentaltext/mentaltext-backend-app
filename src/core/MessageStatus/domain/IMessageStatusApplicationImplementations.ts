import { Filter } from "@/shared/Types/IFilter";
  import { IMessageStatusBase } from "./IMessageStatus";
  import { IMessageStatusRepository } from "./IMessageStatusRepository";
  import { Nullable } from "@/shared/Types/TNullable";

  export type SaveMessageStatus =(user: IMessageStatusBase) => Promise<IMessageStatusBase>
  export type TSaveMessageStatus = (userRepository: IMessageStatusRepository) => SaveMessageStatus;

  export type FindMessageStatus = (criteria: Filter<IMessageStatusBase>[]) => Promise<Nullable<IMessageStatusBase>>
  export type TFindMessageStatus = (userRepository: IMessageStatusRepository) => FindMessageStatus;

  export type UpdateMessageStatus = (user: IMessageStatusBase) => Promise<IMessageStatusBase>
  export type TUpdateMessageStatus = (userRepository: IMessageStatusRepository) => UpdateMessageStatus;
