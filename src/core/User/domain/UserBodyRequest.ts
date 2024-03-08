import { IUserBase } from "./IUser";

export type TUserSendPhoneValidateReqBody = Pick<IUserBase, "phoneCode" | "phoneNumber">;
export type TUserCodePhoneValidateReqBody = Pick<IUserBase, "phoneCode" | "phoneNumber" | "temporaryCode">;
export type TUserCreateProfile = Omit<IUserBase, "">;
