import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserSendPhoneValidateUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { IUserBase } from "../../domain/IUser";
import { Nullable } from "@/shared/Types/TNullable";
import { generarNumeroAleatorio } from "@/shared/utils/RandomNumber";
import { randomUUID } from "crypto";

export const UserSendPhoneValidate: TUserSendPhoneValidateUserCase = (ResponseLogger, SaveUserImp, FindUserImp, UpdateUserImp) => async (req) => {
  try {
    const { phoneCode, phoneNumber } = req.body;

    let user: Nullable<IUserBase> = await FindUserImp([
      {
        field: "phoneNumber",
        value: phoneNumber,
        operator: operatorEnum.EQUAL,
      }
    ]);

    if (!user) {
      user = {
        name: "",
        language: "",
        username: randomUUID(),
        phoneNumber,
        phoneCode,
        profilePhoto: "",
        temporaryCode: generarNumeroAleatorio(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await SaveUserImp(user);
    } else {
      user.temporaryCode = generarNumeroAleatorio(5);
      await UpdateUserImp(user);
    }

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

