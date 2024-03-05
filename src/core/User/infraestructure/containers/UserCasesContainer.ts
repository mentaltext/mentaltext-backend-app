import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { UserRespositorysContainer } from "./UserRespositorysContainer";
import { UserSendPhoneValidate } from "../../application/UseCases/UserSendPhoneValidate";

const {
  findUserImp,
  saveUserImp,
  updateUserImp
} = UserRespositorysContainer;

export const UserCasesContainer = {
  userSendPhoneValidateUserCase: (req: Request, res: Response) => UserSendPhoneValidate(ResponseProvider(res), saveUserImp, findUserImp, updateUserImp)(req),
};
