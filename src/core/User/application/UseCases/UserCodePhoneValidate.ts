import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserCodePhoneValidateUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { IUserBase } from "../../domain/IUser";
import { Nullable } from "@/shared/Types/TNullable";
import { generarNumeroAleatorio } from "@/shared/utils/RandomNumber";

export const UserCodePhoneValidate: TUserCodePhoneValidateUserCase = (ResponseLogger, FindUserImp, UpdateUserImp) => async (req) => {
  try {
    const { phoneNumber, temporaryCode } = req.body;

    let user: Nullable<IUserBase> = await FindUserImp([
      {
        field: "phoneNumber",
        value: phoneNumber,
        operator: operatorEnum.EQUAL,
      },
      {
        field: "temporaryCode",
        value: temporaryCode,
        operator: operatorEnum.EQUAL,
      },
    ]);

    if (!user) {
      throw new Error("Invalid phone code");
    }

    user = await UpdateUserImp({
      ...user,
      temporaryCode: generarNumeroAleatorio(5),
    });

    return ResponseLogger(StatusCodes.OK, "Phone code validated", {
      ...user,
      temporaryCode: "",
    });
  } catch (error) {
    if (error instanceof Error) {
      return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};
