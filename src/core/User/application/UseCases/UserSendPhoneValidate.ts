import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserSendPhoneValidateUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const UserSendPhoneValidate: TUserSendPhoneValidateUserCase = (ResponseLogger, SaveUserImp, FindUserImp, _UpdateUserImp) => async (req) => {
  try {
    const { phoneNumber } = req.body;

    const user = await FindUserImp([
      {
        field: "phoneNumber",
        value: phoneNumber,
        operator: operatorEnum.EQUAL,
      }
    ]);

    if (!user) {
      throw new Error("User not found");
    }

    return ResponseLogger(StatusCodes.OK, "Phone validated", user);
  } catch (error) {
    if (error instanceof Error) {
      return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};

