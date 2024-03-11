import { Filter } from "@/shared/Types/IFilter";
import { IUserProfileBase } from "./IUserProfile";
import { IUserProfileRepository } from "./IUserProfileRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveUserProfile =(user: IUserProfileBase) => Promise<IUserProfileBase>
export type TSaveUserProfile = (userRepository: IUserProfileRepository) => SaveUserProfile;

export type FindUserProfile = (criteria: Filter<IUserProfileBase>[]) => Promise<Nullable<IUserProfileBase>>
export type TFindUserProfile = (userRepository: IUserProfileRepository) => FindUserProfile;

export type UpdateUserProfile = (user: IUserProfileBase) => Promise<IUserProfileBase>
export type TUpdateUserProfile = (userRepository: IUserProfileRepository) => UpdateUserProfile;
