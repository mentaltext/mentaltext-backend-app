import {
  SaveUser,
  FindUser,
  UpdateUser,
} from "./IUserApplicationImplementations";
import {
  TUserRefreshTokenReqBody,
  TUserGetProfileReqBody,
  TUserValidateProfileReqBody,
  TUserCodePhoneValidateReqBody,
  TUserCreateProfileReqBody,
  TUserSendPhoneValidateReqBody,
} from "./UserBodyRequest";
import { TUploadFile } from "@/shared/providers/FileUploader/domain/IFileRepository";
import { SaveUserProfile } from "@/core/UserProfile/domain/IUserProfileApplicationImplementations";
import {
  DecodeInterface,
  TCreateJwtProviderImp,
} from "@/shared/providers/JwtProvider/domain/TJwtProvider";
import { IUserBase } from "./IUser";
import { EndpointHandler } from "@/shared/Types/Request";

export type TUserSendPhoneValidateUserCase = EndpointHandler<
  [SaveUser, FindUser, UpdateUser],
  TUserSendPhoneValidateReqBody
>;
export type TUserCodePhoneValidateUserCase = EndpointHandler<
  [FindUser, UpdateUser, TCreateJwtProviderImp],
  TUserCodePhoneValidateReqBody
>;
export type TUserCreateProfile = EndpointHandler<
  [FindUser, UpdateUser, TUploadFile, SaveUserProfile],
  TUserCreateProfileReqBody,
  { user: IUserBase }
>;
export type TUserRefreshTokenUserCase = EndpointHandler<
  [DecodeInterface, TCreateJwtProviderImp, FindUser],
  TUserRefreshTokenReqBody
>;
export type TUserGetProfileUserCase = EndpointHandler<
  [],
  TUserGetProfileReqBody,
  { user: IUserBase }
>;
export type TUserValidateProfileUserCase = EndpointHandler<
  [FindUser],
  unknown,
  unknown,
  TUserValidateProfileReqBody
>;
