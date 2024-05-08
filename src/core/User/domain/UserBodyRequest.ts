import { IUserProfileBase } from "@/core/UserProfile/domain/IUserProfile";
import { IUserBase } from "./IUser";

interface IUserBaseIUserProfileBase extends Omit<IUserBase, "profilePhoto">, IUserProfileBase {
  profilePhoto: Express.Multer.File;
}

export type TUserSendPhoneValidateReqBody = Pick<IUserBase, "phoneCode" | "phoneNumber">;
export type TUserCodePhoneValidateReqBody = Pick<IUserBase, "phoneCode" | "phoneNumber" | "temporaryCode">;
export type TUserCreateProfileReqBody = Omit<IUserBaseIUserProfileBase, "">;
export type TUserRefreshTokenReqBody = { refreshToken: string };
export type TUserGetProfileReqBody = string;
export type TUserValidateProfileReqBody = Pick<IUserBaseIUserProfileBase, "phoneNumber">;
