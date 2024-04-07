import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserValidateProfileUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const UserValidateProfile: TUserValidateProfileUserCase = (ResponseLogger, FindUserImp) => async (req) => {
  try {
    const {
      phoneNumber
    } = req.query;
    const findedUser = await FindUserImp([
      {
        field: "phoneNumber",
        value: phoneNumber,
        operator: operatorEnum.EQUAL
      }
    ]);

    return ResponseLogger(StatusCodes.OK, "User Finded", {
      findedUser: !!findedUser
    });
  } catch (error) {
    if (error instanceof Error) {
      return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};
