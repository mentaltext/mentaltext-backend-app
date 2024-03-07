import { IUserBase } from "./IUser";

export type TUserSendPhoneValidateReqBody = Pick<IUserBase, "phoneCode" | "phoneNumber">;
