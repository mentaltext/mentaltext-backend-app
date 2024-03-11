import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import {
  SaveUser,
  FindUser,
  UpdateUser,
} from "./IUserApplicationImplementations";
import { Request, Response } from "express";
// import { TComapreProviderImp, THashProviderImp } from "@/shared/providers/HashProvider/domain/IHashProvider";
// import { DecodeInterface, TCreateJwtProviderImp } from "@/shared/providers/JwtProvider/domain/TJwtProvider";
import {
  TUserCodePhoneValidateReqBody,
  TUserCreateProfileReqBody,
  TUserSendPhoneValidateReqBody,
} from "./UserBodyRequest";
import { TUploadFile } from "@/shared/providers/FileUploader/domain/IFileRepository";
import { SaveUserProfile } from "@/core/UserProfile/domain/IUserProfileApplicationImplementations";

type EndpointHandler<T extends unknown[], ReqBody = unknown> = (
  ResponserProvider: TResponseLoggerImp,
  ...implementations: T
) => (
  req: Request<unknown, unknown, ReqBody>
) => Promise<Response<unknown, Record<string, unknown>> | undefined>;

export type TUserSendPhoneValidateUserCase = EndpointHandler<
  [SaveUser, FindUser, UpdateUser],
  TUserSendPhoneValidateReqBody
>;
export type TUserCodePhoneValidateUserCase = EndpointHandler<
  [FindUser, UpdateUser],
  TUserCodePhoneValidateReqBody
>;
export type TUserCreateProfile = EndpointHandler<
  [FindUser, UpdateUser, TUploadFile, SaveUserProfile],
  TUserCreateProfileReqBody
>;
