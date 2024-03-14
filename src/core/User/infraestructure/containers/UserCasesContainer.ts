import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { UserRespositorysContainer } from "./UserRespositorysContainer";
import { UserSendPhoneValidate } from "../../application/UseCases/UserSendPhoneValidate";
import { UserCodePhoneValidate } from "../../application/UseCases/UserCodePhoneValidate";
import { FileRespositorysContainer } from "@/shared/providers/FileUploader/infraestructure/FileContainer";
import { UserCreateProfile } from "../../application/UseCases/UserCreateProfile";
import { UserProfileRespositorysContainer } from "@/core/UserProfile/infraestructure/containers/UserProfileRespositorysContainer";
import { CreateJwtProvider } from "@/shared/providers/JwtProvider/infraestructure/JwtProvider";

const { findUserImp, saveUserImp, updateUserImp } = UserRespositorysContainer;
const { uploadImage } = FileRespositorysContainer;
const { saveUserProfileImp } = UserProfileRespositorysContainer;

const jwtImp = CreateJwtProvider();

export const UserCasesContainer = {
  userSendPhoneValidateUserCase: (req: Request, res: Response) =>
    UserSendPhoneValidate(
      ResponseProvider(res),
      saveUserImp,
      findUserImp,
      updateUserImp
    )(req),
  userCodePhoneValidateUserCase: (req: Request, res: Response) =>
    UserCodePhoneValidate(
      ResponseProvider(res),
      findUserImp,
      updateUserImp,
      jwtImp
    )(req),
  userCreateProfile: (req: Request, res: Response) =>
    UserCreateProfile(
      ResponseProvider(res),
      findUserImp,
      updateUserImp,
      uploadImage,
      saveUserProfileImp
    )(req),
};
