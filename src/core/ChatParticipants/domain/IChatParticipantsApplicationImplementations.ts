import { Filter } from "@/shared/Types/IFilter";
import { IChatParticipantsBase } from "./IChatParticipants";
import { IChatParticipantsRepository } from "./IChatParticipantsRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveChatParticipants = (
  user: IChatParticipantsBase
) => Promise<IChatParticipantsBase>;
export type TSaveChatParticipants = (
  userRepository: IChatParticipantsRepository
) => SaveChatParticipants;

export type FindChatParticipants = (
  criteria: Filter<IChatParticipantsBase>[]
) => Promise<Nullable<IChatParticipantsBase>>;
export type TFindChatParticipants = (
  userRepository: IChatParticipantsRepository
) => FindChatParticipants;

export type UpdateChatParticipants = (
  user: IChatParticipantsBase
) => Promise<IChatParticipantsBase>;
export type TUpdateChatParticipants = (
  userRepository: IChatParticipantsRepository
) => UpdateChatParticipants;
