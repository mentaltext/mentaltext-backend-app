import { TUserGetProfileUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const UserGetProfile: TUserGetProfileUserCase = (ResponseLogger) => async (req) => {
  try {
    const user = req.user;
    return ResponseLogger(StatusCodes.OK, "", user);
  } catch (error) {
    if (error instanceof Error) {
      return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};
