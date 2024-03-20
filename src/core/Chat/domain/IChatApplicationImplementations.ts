import { Filter } from "@/shared/Types/IFilter";
import { IChatBase } from "./IChat";
import { IChatRepository } from "./IChatRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveChat =(user: IChatBase) => Promise<IChatBase>
export type TSaveChat = (userRepository: IChatRepository) => SaveChat;

export type FindChat = (criteria: Filter<IChatBase>[]) => Promise<Nullable<IChatBase>>
export type TFindChat = (userRepository: IChatRepository) => FindChat;

export type UpdateChat = (user: IChatBase) => Promise<IChatBase>
export type TUpdateChat = (userRepository: IChatRepository) => UpdateChat;
