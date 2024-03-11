import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserCreateProfile } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { IUserBase } from "../../domain/IUser";
import { Nullable } from "@/shared/Types/TNullable";
import { AWS_S3_BUCKET_NAME } from "@/shared/constants/CommonConstants";

export const UserCreateProfile: TUserCreateProfile =
  (ResponseLogger, FindUserImp, UpdateUserImp, UploadImage) => async (req) => {
    try {
      const { phoneNumber, name, username, language } = req.body;
      const profilePhoto = req.file;
      const usernameExists: Nullable<IUserBase> = await FindUserImp([
        {
          field: "username",
          value: username,
          operator: operatorEnum.EQUAL,
        },
      ]);

      if (usernameExists) {
        return ResponseLogger(
          StatusCodes.BAD_REQUEST,
          "Username already exists",
          null
        );
      }

      let user: Nullable<IUserBase> = await FindUserImp([
        {
          field: "phoneNumber",
          value: phoneNumber,
          operator: operatorEnum.EQUAL,
        },
      ]);
      if (!user) {
        return ResponseLogger(StatusCodes.NOT_FOUND, "User not found", null);
      }

      const fileName = `profile-photo-${user.phoneNumber}-${user.username}-${Date.now()}`;

      const photoRoute = await UploadImage(profilePhoto!, AWS_S3_BUCKET_NAME, fileName);
      user = {
        ...user,
        name: name || "",
        username: username || "",
        profilePhoto: photoRoute || "",
        language: language || "es",
        updatedAt: new Date(),
      };

      await UpdateUserImp(user);

      return ResponseLogger(StatusCodes.OK, "Phone validated", {
        ...user,
        temporaryCode: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
